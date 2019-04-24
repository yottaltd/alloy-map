import { debug, Debugger } from 'debug';
import * as _ from 'lodash';
import OLAttribution from 'ol/control/Attribution';
import OLMap from 'ol/Map';
import OLView from 'ol/View';
import { SimpleEventDispatcher } from 'ste-simple-events';
import { AlloyMapError } from '../../error/AlloyMapError';
import { Api } from '../../svr/Api';
import { ApiFactory } from '../../svr/ApiFactory';
import { FontUtils } from '../../utils/FontUtils';
import { AlloyBasemap } from '../basemaps/AlloyBasemap';
import { FeatureSelectionChangeEventHandler } from '../events/FeatureSelectionChangeEventHandler';
import { FeaturesUnderSelectionEventHandler } from '../events/FeaturesUnderSelectionEventHandler';
import { LayersChangeEvent } from '../events/LayersChangeEvent';
import { LayersChangeEventHandler } from '../events/LayersChangeEventHandler';
import { MapChangeCentreEvent } from '../events/MapChangeCentreEvent';
import { MapChangeCentreEventHandler } from '../events/MapChangeCentreEventHandler';
import { MapChangeZoomEvent } from '../events/MapChangeZoomEvent';
import { MapChangeZoomEventHandler } from '../events/MapChangeZoomEventHandler';
import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyHoverInteraction } from '../interactions/AlloyHoverInteraction';
import { AlloyPingInteraction } from '../interactions/AlloyPingInteraction';
import { AlloySelectInPolygonInteraction } from '../interactions/AlloySelectInPolygonInteraction';
import { AlloySelectionInteraction } from '../interactions/AlloySelectionInteraction';
import { AlloyLayer } from '../layers/AlloyLayer';
import { AlloyHoverLayer } from '../layers/hover/AlloyHoverLayer';
import { AlloySelectionLayer } from '../layers/selection/AlloySelectionLayer';
import { AlloyBounds } from './AlloyBounds';
import { AlloyCoordinate } from './AlloyCoordinate';
import { AlloyMapOptions } from './AlloyMapOptions';
import { AlloySelectionMode } from './AlloySelectionMode';

/**
 * minimum zoom level for the map
 * @ignore
 */
const MIN_ZOOM: number = 4;

/**
 * maximum zoom level for the map
 * @ignore
 */
const MAX_ZOOM: number = 22;

/**
 * the number in milliseconds to debounce very shouty openlayers events e.g. resolution change
 * @ignore
 */
const DEBOUNCED_EVENT_TIMEOUT: number = 100;

/**
 * the alloy map manages basemaps, layers and drawing
 */
export class AlloyMap {
  /**
   * debugger instance
   * @ignore
   */
  public readonly debugger: Debugger = debug('alloymaps');

  /**
   * the api service to use for making calls to the alloy web api
   * @ignore
   */
  public readonly api: Api;

  /**
   * open layers maps instance
   * @ignore
   */
  public readonly olMap: OLMap;

  /**
   * open layers view instance
   * @ignore
   */
  public readonly olView: OLView;

  /**
   * the hover layer instance managing hover rendering
   * @ignore
   */
  public readonly hoverLayer: AlloyHoverLayer;

  /**
   * the selection layer instance managing selection rendering
   * @ignore
   */
  public readonly selectionLayer: AlloySelectionLayer;

  /**
   * the selection interaction manager, determines when clicks occur etc.
   */
  public readonly selectionInteraction: AlloySelectionInteraction;

  /**
   * the currently active basemap or null if not se
   * @ignore
   */
  private currentBasemap: AlloyBasemap | null = null;

  /**
   * the layers currently managed by the map
   */
  private readonly managedLayers = new Map<string, AlloyLayer>();

  /**
   * the hover interaction manager, determines when mouseovers occur etc.
   */
  private readonly hoverInteraction: AlloyHoverInteraction;

  /**
   * the selection in polygon interaction manager, determines when clicks occur etc.
   */
  private readonly selectInPolygonInteraction: AlloySelectInPolygonInteraction;

  /**
   * the ping interaction manager, shows a nice ping animation
   */
  private readonly pingInteraction: AlloyPingInteraction;

  /**
   * event dispatcher for change center events
   */
  private readonly onChangeCenter = new SimpleEventDispatcher<MapChangeCentreEvent>();

  /**
   * event dispatcher for change zoom events
   */
  private readonly onChangeZoom = new SimpleEventDispatcher<MapChangeZoomEvent>();

  /**
   * event dispatcher for change layers events
   */
  private readonly onChangeLayers = new SimpleEventDispatcher<LayersChangeEvent>();

  /**
   * creates a new alloy map instance
   * @param options the options to initialise the map
   */
  constructor(options: AlloyMapOptions) {
    // create a new api instance
    this.api = ApiFactory.api(options.api, options.token);

    // if we have fonts, try to set them up
    FontUtils.load([
      // always load the alloy icons if we can
      FontUtils.FONT_ALLOY_ICONS_LOADER_SETTINGS,
      // merge the user provided webfonts into the loader for fonts
      ...(options.webfonts ? options.webfonts : []),
    ]);

    // create the view (initial positioning)
    this.olView = new OLView({
      center: options.centre ? options.centre.toMapCoordinate() : [0, 0],
      zoom: _.clamp(options.zoom || MIN_ZOOM, MIN_ZOOM, MAX_ZOOM),
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
    });

    // construct the map instance
    this.olMap = new OLMap({
      target: options.element,
      controls: [
        new OLAttribution({
          collapsed: false,
          collapsible: false,
          className: 'map__attributions',
        }),
      ],
      view: this.olView,
    });

    // listen for view centre changes
    this.olView.on(
      'change:center',
      _.debounce(
        () =>
          this.onChangeCenter.dispatch(
            new MapChangeCentreEvent(
              AlloyCoordinate.fromMapCoordinate(this.olView.getCenter()),
              this.olView.getResolution(),
              this.olView.calculateExtent(),
            ),
          ),
        DEBOUNCED_EVENT_TIMEOUT,
      ),
    );

    // listen for resolution changes (we broadcast zoom levels)
    this.olView.on(
      'change:resolution',
      _.debounce(
        () =>
          this.onChangeZoom.dispatch(
            new MapChangeZoomEvent(this.olView.getZoom(), this.olView.getResolution()),
          ),
        DEBOUNCED_EVENT_TIMEOUT,
      ),
    );

    // setup hover layer, interaction and add it to the map
    this.hoverLayer = new AlloyHoverLayer({ map: this });
    this.hoverInteraction = new AlloyHoverInteraction(this);
    this.olMap.addLayer(this.hoverLayer.olLayer);

    // setup selection layer, interaction and add it to the map
    this.selectionLayer = new AlloySelectionLayer({ map: this });
    this.selectionInteraction = new AlloySelectionInteraction(this);
    this.olMap.addLayer(this.selectionLayer.olLayer);

    // setup ping interaction
    this.pingInteraction = new AlloyPingInteraction(this);

    // setup select in poly interaction
    this.selectInPolygonInteraction = new AlloySelectInPolygonInteraction(this);
  }

  /**
   * layers currently on display in the map
   */
  public get layers(): Map<string, AlloyLayer> {
    return new Map(this.managedLayers);
  }

  /**
   * the active basemap shown under all layers
   */
  public get basemap(): Readonly<AlloyBasemap | null> {
    return this.currentBasemap;
  }

  /**
   * the currently selected features
   */
  public get selectedFeatures(): Readonly<Map<string, AlloyFeature>> {
    return this.selectionLayer.features; // already wrapped in new map
  }

  /**
   * the current selection mode
   */
  public get selectionMode(): Readonly<AlloySelectionMode> {
    return this.selectionInteraction.selectionMode;
  }

  /**
   * the current zoom level
   */
  public get zoom(): number {
    return this.olView.getZoom();
  }

  /**
   * the current viewport representing the south west and north east corners of the map
   */
  public get viewport(): Readonly<AlloyBounds> {
    const extent = this.olView.calculateExtent();
    return AlloyBounds.fromMapExtent(extent);
  }

  /**
   * the coordinates of the current map centre
   */
  public get centre(): Readonly<AlloyCoordinate> {
    return AlloyCoordinate.fromMapCoordinate(this.olView.getCenter());
  }

  /**
   * centres the map viewport on a location
   * @param coordinate the location to centre the map on
   */
  public setCentre(coordinate: AlloyCoordinate): void {
    this.olView.setCenter(coordinate.toMapCoordinate());
  }

  /**
   * adds an event handler to listen for the `MapChangeCentreEvent` event
   * @param handler the handler to call when the event is raised
   */
  public addMapChangeCentreListener(handler: MapChangeCentreEventHandler): void {
    this.onChangeCenter.subscribe(handler);
  }

  /**
   * removes an event handler listening to the `MapChangeCentreEvent` event
   * @param handler the handler to stop listening
   */
  public removeMapChangeCentreListener(handler: MapChangeCentreEventHandler): void {
    this.onChangeCenter.unsubscribe(handler);
  }

  /**
   * attempts to set the viewport to the bounds provided, it will attempt a "best fit" approach
   * which makes sure both north east and south west are visible
   * @param bounds the bounds to fit on the screen
   * @param animate whether to animate to the viewport
   */
  public setViewport(bounds: AlloyBounds, animate?: boolean): void {
    this.olView.fit(bounds.toMapExtent(), {
      duration: animate ? 500 : undefined,
    });
  }

  /**
   * sets the zoom level of the map
   * @param zoom the zoom level
   */
  public setZoom(zoom: number): void {
    this.olView.setZoom(_.clamp(zoom || MIN_ZOOM, MIN_ZOOM, MAX_ZOOM));
  }

  /**
   * adds an event handler to listen for the `MapChangeZoomEvent` event
   * @param handler the handler to call when the event is raised
   */
  public addMapChangeZoomListener(handler: MapChangeZoomEventHandler): void {
    this.onChangeZoom.subscribe(handler);
  }

  /**
   * removes an event handler listening to the `MapChangeZoomEvent` event
   * @param handler the handler to stop listening
   */
  public removeMapChangeZoomListener(handler: MapChangeZoomEventHandler): void {
    this.onChangeZoom.unsubscribe(handler);
  }

  /**
   * sets the selection mode for the map and resets any applicable state
   * @param mode the mode to set
   */
  public setSelectionMode(mode: AlloySelectionMode): void {
    this.selectionInteraction.setSelectionMode(mode);
  }

  /**
   * adds a layer to the map
   * @param layer the layer to add to the map
   */
  public addLayer(layer: AlloyLayer): void {
    if (this.managedLayers.has(layer.id)) {
      throw new AlloyMapError(1554118465, 'layer already added to map');
    }
    this.olMap.addLayer(layer.olLayer);
    this.managedLayers.set(layer.id, layer);

    // dispatch layers change event
    this.onChangeLayers.dispatch(
      new LayersChangeEvent(this.managedLayers /* constructor clones the layers */),
    );
  }

  /**
   * removes a layer from the map
   * @param layer the layer to remove
   */
  public removeLayer(layer: AlloyLayer): void {
    if (!this.managedLayers.has(layer.id)) {
      throw new AlloyMapError(1554118768, 'layer does not exist in map');
    }
    this.olMap.removeLayer(layer.olLayer);
    this.managedLayers.delete(layer.id);

    // get all the currently selected features
    const currentlySelectedFeatures = this.selectionLayer.features;
    if (currentlySelectedFeatures.size > 0) {
      const selectedFeaturesNotInRemovedLayer = Array.from(
        currentlySelectedFeatures.values(),
      ).filter(
        // filter out features that are in the layer we removed above
        (f) => f.originatingLayerId !== layer.id,
      );

      // if the filtered list is not the same size as the original selected features then change
      // what is selected to omit the features that were in the removed layer
      if (selectedFeaturesNotInRemovedLayer.length !== currentlySelectedFeatures.size) {
        this.selectionInteraction.setSelectedFeatures(selectedFeaturesNotInRemovedLayer);
      }
    }

    // remove the currently hovered feature if its from the layer removed
    if (
      this.hoverLayer.hoveredFeature &&
      this.hoverLayer.hoveredFeature.originatingLayerId === layer.id
    ) {
      this.hoverLayer.setHoveredFeature(null);
    }

    // dispatch layers change event
    this.onChangeLayers.dispatch(
      new LayersChangeEvent(this.managedLayers /* constructor clones the layers */),
    );
  }

  /**
   * adds an event handler to listen for the `LayersChangeEvent` event
   * @param handler the handler to call when the event is raised
   */
  public addLayersChangeListener(handler: LayersChangeEventHandler): void {
    this.onChangeLayers.subscribe(handler);
  }

  /**
   * removes an event handler listening to the `LayersChangeEvent` event
   * @param handler the handler to stop listening
   */
  public removeLayersChangeListener(handler: LayersChangeEventHandler): void {
    this.onChangeLayers.unsubscribe(handler);
  }

  /**
   * Starts interaction to draw a polygon and select all features inside of it
   * @param appendToSelection whether to append the final selection to the existing selection
   */
  public startPolygonSelect(appendToSelection: boolean = false) {
    this.selectInPolygonInteraction.startPolygonSelect(appendToSelection);
  }

  /**
   * Cancels interaction for selecting features in a drawn polygon
   */
  public cancelPolygonSelect() {
    this.selectInPolygonInteraction.stopPolygonSelect();
  }

  /**
   * sets the active basemap to render layers on top of
   * @param basemap the basemap to use
   */
  public setBasemap(basemap: AlloyBasemap): void {
    // remove the layer from the map
    if (this.currentBasemap) {
      this.olMap.removeLayer(this.currentBasemap.layer);
      this.currentBasemap = null;
    }

    // add the map to open layers
    this.olMap.getLayers().insertAt(0, basemap.layer);

    // update internal basemap reference
    this.currentBasemap = basemap;
  }

  /**
   * sets the currently selected feature, this will remove any existing selected feature(s) and
   * trigger the `FeatureSelectionChangeEvent` if selected features were modified.
   * @param feature the feature to select or null to deselect all features
   */
  public setSelectedFeature(feature: AlloyFeature | null): void {
    if (feature === null) {
      this.selectionInteraction.setSelectedFeatures([]);
    } else {
      this.selectionInteraction.setSelectedFeature(feature);
    }
  }

  /**
   * sets the currently selected features, this will remove any existing selected feature(s) and
   * trigger the `FeatureSelectionChangeEvent` if selected features were modified.
   * @param features the features to select, passing an empty array will deselect all features
   */
  public setSelectedFeatures(features: AlloyFeature[]): void {
    this.selectionInteraction.setSelectedFeatures(features);
  }

  /**
   * selects a feature in addition to the already selected features, this will retain any existing
   * selected feature(s) and trigger the `FeatureSelectionChangeEvent` if selected features were
   * modified.
   * @param feature the feature to select
   */
  public selectFeature(feature: AlloyFeature): void {
    this.selectionInteraction.selectFeature(feature);
  }

  /**
   * selects features in addition to the already selected features, this will retain any existing
   * selected feature(s) and trigger the `FeatureSelectionChangeEvent` if selected features were
   * modified.
   * @param features the features to select
   */
  public selectFeatures(features: AlloyFeature[]): void {
    this.selectionInteraction.selectFeatures(features);
  }

  /**
   * adds an event handler to listen for the `FeatureSelectionChangeEvent` event
   * @param handler the handler to call when the event is raised
   */
  public addFeatureSelectionChangeListener(handler: FeatureSelectionChangeEventHandler): void {
    this.selectionInteraction.addFeatureSelectionChangeListener(handler);
  }

  /**
   * removes an event handler listening to the `FeatureSelectionChangeEvent` event
   * @param handler the handler to stop listening
   */
  public removeFeatureSelectionChangeListener(handler: FeatureSelectionChangeEventHandler): void {
    this.selectionInteraction.removeFeatureSelectionChangeListener(handler);
  }

  /**
   * adds an event handler to listen for the `FeaturesUnderSelectionEvent` event
   * @param handler the handler to call when the event is raised
   */
  public addFeaturesUnderSelectionListener(handler: FeaturesUnderSelectionEventHandler): void {
    this.selectionInteraction.addFeaturesUnderSelectionListener(handler);
  }

  /**
   * removes an event handler listening to the `FeaturesUnderSelectionEvent` event
   * @param handler the handler to stop listening
   */
  public removeFeaturesUnderSelectionListener(handler: FeaturesUnderSelectionEventHandler): void {
    this.selectionInteraction.removeFeaturesUnderSelectionListener(handler);
  }
}
