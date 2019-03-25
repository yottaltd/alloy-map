import { AlloyMap } from '../AlloyMap';
import { AlloyLayer } from '../AlloyLayer';
import { AlloyBasemap } from '../AlloyBasemap';
import { AlloyFeature } from '../AlloyFeature';
import { AlloySelectionMode } from '../AlloySelectionMode';
import { AlloyBounds } from '../AlloyBounds';
import { AlloyCoordinate } from '../AlloyCoordinate';

export class AlloyMapImpl implements AlloyMap {
  constructor(element: HTMLElement) {}

  get element(): HTMLElement {
    return null as any;
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
    return null as any;
  }

  get viewport(): Readonly<AlloyBounds> {
    return null as any;
  }

  get centre(): Readonly<AlloyCoordinate> {
    return null as any;
  }

  setCentre(coordinate: AlloyCoordinate): void {
    throw new Error('Method not implemented.');
  }

  setViewport(bounds: AlloyBounds): void {
    throw new Error('Method not implemented.');
  }

  setZoom(zoom: number): void {
    throw new Error('Method not implemented.');
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
