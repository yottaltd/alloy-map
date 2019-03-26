import * as _ from 'lodash';
import OLAttribution from 'ol/control/Attribution';
import OLMap from 'ol/Map';
import OLView from 'ol/View';
import { SimpleEventDispatcher } from 'ste-simple-events';
import { MapChangeCentreEvent } from '../events/MapChangeCentreEvent';
import { MapChangeCentreEventHandler } from '../events/MapChangeCentreEventHandler';
import { MapChangeZoomEvent } from '../events/MapChangeZoomEvent';
import { MapChangeZoomEventHandler } from '../events/MapChangeZoomEventHandler';
import { AlloyBasemap } from './AlloyBasemap';
import { AlloyBounds } from './AlloyBounds';
import { AlloyCoordinate } from './AlloyCoordinate';
import { AlloyFeature } from './AlloyFeature';
import { AlloyLayer } from './AlloyLayer';
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
 * the alloy map manages basemaps, layers and drawing
 */
export class AlloyMap {
  /**
   * open layers maps instance
   * @ignore
   */
  protected readonly olMap: OLMap;

  /**
   * open layers view instance
   * @ignore
   */
  protected readonly olView: OLView;

  /**
   * the currently active basemap or null if not set
   * @ignore
   */
  private currentBasemap: AlloyBasemap | null = null;

  /**
   * event dispatcher for change center events
   * @ignore
   */
  private readonly onChangeCenter = new SimpleEventDispatcher<MapChangeCentreEvent>();

  /**
   * event dispatcher for change zoom events
   * @ignore
   */
  private readonly onChangeZoom = new SimpleEventDispatcher<MapChangeZoomEvent>();

  /**
   * creates a new alloy map instance
   * @param options the options to initialise the map
   */
  constructor(options: AlloyMapOptions) {
    // create the view (initial positioning)
    this.olView = new OLView({
      center: options.centre ? options.centre.toArray() : [0, 0],
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
    this.olView.on('change:center', (e) => {
      this.onChangeCenter.dispatch(
        new MapChangeCentreEvent(AlloyCoordinate.fromArray(this.olView.getCenter())),
      );
    });

    // listen for resolution changes (we broadcast zoom levels)
    this.olView.on('change:resolution', (e) => {
      this.onChangeZoom.dispatch(new MapChangeZoomEvent(this.olView.getZoom()));
    });
  }

  /**
   * the element containing the map
   */
  public get element(): Element {
    return this.olMap.getTargetElement();
  }

  /**
   * layers currently on display in the map
   */
  public get layers(): Readonly<AlloyLayer[]> {
    return null as any;
  }

  /**
   * the active basemap shown under all layers
   */
  public get basemap(): Readonly<AlloyBasemap | null> {
    return this.currentBasemap;
  }

  /**
   * the features on the map
   */
  public get features(): Readonly<Map<string, AlloyFeature>> {
    return null as any;
  }

  /**
   * the currently selected features
   */
  public get selectedFeatures(): Readonly<Map<string, AlloyFeature>> {
    return null as any;
  }

  /**
   * the current selection mode
   */
  public get selectionMode(): Readonly<AlloySelectionMode> {
    return null as any;
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
    return new AlloyBounds(
      new AlloyCoordinate(extent[0], extent[1]),
      new AlloyCoordinate(extent[2], extent[3]),
    );
  }

  /**
   * the coordinates of the current map centre
   */
  public get centre(): Readonly<AlloyCoordinate> {
    return AlloyCoordinate.fromArray(this.olView.getCenter());
  }

  /**
   * centres the map viewport on a location
   * @param coordinate the location to centre the map on
   */
  public setCentre(coordinate: AlloyCoordinate): void {
    this.olView.setCenter(coordinate.toArray());
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
   */
  public setViewport(bounds: AlloyBounds): void {
    this.olView.fit(bounds.toArray());
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

  public setSelectionMode(mode: AlloySelectionMode): void {
    throw new Error('Method not implemented.');
  }

  public addLayer(layer: AlloyLayer): void {
    throw new Error('Method not implemented.');
  }

  public removeLayer(layer: AlloyLayer): void {
    throw new Error('Method not implemented.');
  }

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

  public setSelectedFeature(feature: AlloyFeature): void {
    throw new Error('Method not implemented.');
  }

  public setSelectedFeatures(features: AlloyFeature[]): void {
    throw new Error('Method not implemented.');
  }

  public selectFeature(feature: AlloyFeature): void {
    throw new Error('Method not implemented.');
  }

  public selectFeatures(features: AlloyFeature[]): void {
    throw new Error('Method not implemented.');
  }

  public deselectFeature(feature: AlloyFeature): void {
    throw new Error('Method not implemented.');
  }

  public deselectFeatures(features: AlloyFeature[]): void {
    throw new Error('Method not implemented.');
  }
}
