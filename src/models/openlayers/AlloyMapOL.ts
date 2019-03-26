import * as _ from 'lodash';
import OLAttribution from 'ol/control/Attribution';
import OLMap from 'ol/Map';
import OLView from 'ol/View';
import { SimpleEventDispatcher } from 'ste-simple-events';
import { AlloyBasemap } from '../core/AlloyBasemap';
import { AlloyBounds } from '../core/AlloyBounds';
import { AlloyCoordinate } from '../core/AlloyCoordinate';
import { AlloyFeature } from '../core/AlloyFeature';
import { AlloyLayer } from '../core/AlloyLayer';
import { AlloyMap } from '../core/AlloyMap';
import { AlloySelectionMode } from '../core/AlloySelectionMode';
import { MapChangeCentreEvent } from '../events/MapChangeCentreEvent';
import { MapChangeCentreEventHandler } from '../events/MapChangeCentreEventHandler';
import { MapChangeZoomEvent } from '../events/MapChangeZoomEvent';
import { MapChangeZoomEventHandler } from '../events/MapChangeZoomEventHandler';

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
 * alloy map implementation with open layers
 * @ignore
 */
export class AlloyMapOL implements AlloyMap {
  /**
   * open layers maps instance
   */
  readonly olMap: OLMap;

  /**
   * open layers view instance
   */
  readonly olView: OLView;
  private readonly onChangeCenter = new SimpleEventDispatcher<MapChangeCentreEvent>();
  private readonly onChangeZoom = new SimpleEventDispatcher<MapChangeZoomEvent>();

  constructor(options: { element: Element; centre?: AlloyCoordinate; zoom?: number }) {
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
    this.olMap.on('change:resolution', (e) => {
      this.onChangeZoom.dispatch(new MapChangeZoomEvent(this.olView.getZoom()));
    });
  }

  get element(): Element {
    return this.olMap.getTargetElement();
  }

  get layers(): Readonly<AlloyLayer[]> {
    return null as any;
  }

  get basemap(): Readonly<AlloyBasemap> {
    return null as any;
  }

  get features(): Readonly<Map<string, AlloyFeature>> {
    return null as any;
  }

  get selectedFeatures(): Readonly<Map<string, AlloyFeature>> {
    return null as any;
  }

  get selectionMode(): Readonly<AlloySelectionMode> {
    return null as any;
  }

  get zoom(): number {
    return this.olView.getZoom();
  }

  get viewport(): Readonly<AlloyBounds> {
    const extent = this.olView.calculateExtent();
    return new AlloyBounds(
      new AlloyCoordinate(extent[0], extent[1]),
      new AlloyCoordinate(extent[2], extent[3]),
    );
  }

  get centre(): Readonly<AlloyCoordinate> {
    return AlloyCoordinate.fromArray(this.olView.getCenter());
  }

  setCentre(coordinate: AlloyCoordinate): void {
    this.olView.setCenter(coordinate.toArray());
  }

  addMapChangeCentreListener(handler: MapChangeCentreEventHandler): void {
    this.onChangeCenter.subscribe(handler);
  }

  removeMapChangeCentreListener(handler: MapChangeCentreEventHandler): void {
    this.onChangeCenter.unsubscribe(handler);
  }

  setViewport(bounds: AlloyBounds): void {
    this.olView.fit(bounds.toArray());
  }

  setZoom(zoom: number): void {
    this.olView.setZoom(_.clamp(zoom || MIN_ZOOM, MIN_ZOOM, MAX_ZOOM));
  }

  addMapChangeZoomListener(handler: MapChangeZoomEventHandler): void {
    this.onChangeZoom.subscribe(handler);
  }

  removeMapChangeZoomListener(handler: MapChangeZoomEventHandler): void {
    this.onChangeZoom.unsubscribe(handler);
  }

  setSelectionMode(mode: AlloySelectionMode): void {
    throw new Error('Method not implemented.');
  }

  addLayer(layer: AlloyLayer): void {
    throw new Error('Method not implemented.');
  }

  removeLayer(layer: AlloyLayer): void {
    throw new Error('Method not implemented.');
  }

  setBasemap(basemap: AlloyBasemap): void {
    throw new Error('Method not implemented.');
  }

  setSelectedFeature(feature: AlloyFeature): void {
    throw new Error('Method not implemented.');
  }

  setSelectedFeatures(features: AlloyFeature[]): void {
    throw new Error('Method not implemented.');
  }

  selectFeature(feature: AlloyFeature): void {
    throw new Error('Method not implemented.');
  }

  selectFeatures(features: AlloyFeature[]): void {
    throw new Error('Method not implemented.');
  }

  deselectFeature(feature: AlloyFeature): void {
    throw new Error('Method not implemented.');
  }

  deselectFeatures(features: AlloyFeature[]): void {
    throw new Error('Method not implemented.');
  }
}
