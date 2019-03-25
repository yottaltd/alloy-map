import { AlloyBasemap } from './AlloyBasemap';
import { AlloyBounds } from './AlloyBounds';
import { AlloyCoordinate } from './AlloyCoordinate';
import { AlloyFeature } from './AlloyFeature';
import { AlloyLayer } from './AlloyLayer';
import { AlloySelectionMode } from './AlloySelectionMode';

export interface AlloyMap {
  readonly element: HTMLElement;
  readonly layers: Readonly<AlloyLayer[]>;
  readonly basemap: Readonly<AlloyBasemap>;
  readonly features: Readonly<Map<string, AlloyFeature>>;
  readonly selectedFeatures: Readonly<Map<string, AlloyFeature>>;
  readonly selectionMode: Readonly<AlloySelectionMode>;
  readonly zoom: Readonly<number>;
  readonly viewport: Readonly<AlloyBounds>;
  readonly centre: Readonly<AlloyCoordinate>;

  setCentre(coordinate: AlloyCoordinate): void;
  setViewport(bounds: AlloyBounds): void;
  setZoom(zoom: number): void;
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
