import { MapChangeCentreEventHandler } from '../events/MapChangeCentreEventHandler';
import { MapChangeZoomEventHandler } from '../events/MapChangeZoomEventHandler';
import { AlloyBasemap } from './AlloyBasemap';
import { AlloyBounds } from './AlloyBounds';
import { AlloyCoordinate } from './AlloyCoordinate';
import { AlloyFeature } from './AlloyFeature';
import { AlloyLayer } from './AlloyLayer';
import { AlloySelectionMode } from './AlloySelectionMode';

/**
 * alloy map interface
 */
export interface AlloyMap {
  /**
   * the element containing the map
   */
  readonly element: Element;

  /**
   * layers currently on display in the map
   */
  readonly layers: Readonly<AlloyLayer[]>;

  /**
   * the active basemap shown under all layers
   */
  readonly basemap: Readonly<AlloyBasemap>;

  /**
   * the features on the map
   */
  readonly features: Readonly<Map<string, AlloyFeature>>;

  /**
   * the currently selected features
   */
  readonly selectedFeatures: Readonly<Map<string, AlloyFeature>>;

  /**
   * the current selection mode
   */
  readonly selectionMode: Readonly<AlloySelectionMode>;

  /**
   * the current zoom level
   */
  readonly zoom: Readonly<number>;

  /**
   * the current viewport representing the south west and north east corners of the map
   */
  readonly viewport: Readonly<AlloyBounds>;

  /**
   * the coordinates of the current map centre
   */
  readonly centre: Readonly<AlloyCoordinate>;

  /**
   * centres the map viewport on a location
   * @param coordinate the location to centre the map on
   */
  setCentre(coordinate: AlloyCoordinate): void;

  /**
   * adds an event handler to listen for the `MapChangeCentreEvent` event
   * @param handler the handler to call when the event is raised
   */
  addMapChangeCentreListener(handler: MapChangeCentreEventHandler): void;

  /**
   * removes an event handler listening to the `MapChangeCentreEvent` event
   * @param handler the handler to stop listening
   */
  removeMapChangeCentreListener(handler: MapChangeCentreEventHandler): void;

  /**
   * attempts to set the viewport to the bounds provided, it will attempt a "best fit" approach
   * which makes sure both north east and south west are visible
   * @param bounds the bounds to fit on the screen
   */
  setViewport(bounds: AlloyBounds): void;

  /**
   * sets the zoom level of the map
   * @param zoom the zoom level
   */
  setZoom(zoom: number): void;

  /**
   * adds an event handler to listen for the `MapChangeZoomEvent` event
   * @param handler the handler to call when the event is raised
   */
  addMapChangeZoomListener(handler: MapChangeZoomEventHandler): void;

  /**
   * removes an event handler listening to the `MapChangeZoomEvent` event
   * @param handler the handler to stop listening
   */
  removeMapChangeZoomListener(handler: MapChangeZoomEventHandler): void;
  setSelectionMode(mode: AlloySelectionMode): void;
  addLayer(layer: AlloyLayer): void;
  removeLayer(layer: AlloyLayer): void;
  setBasemap(basemap: AlloyBasemap): void;
  setSelectedFeature(feature: AlloyFeature): void;
  setSelectedFeatures(features: AlloyFeature[]): void;
  selectFeature(feature: AlloyFeature): void;
  selectFeatures(features: AlloyFeature[]): void;
  deselectFeature(feature: AlloyFeature): void;
  deselectFeatures(features: AlloyFeature[]): void;
}
