import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyStyleProcessor } from '@/map/styles/AlloyStyleProcessor';
import OLLayer from 'ol/layer/Layer';

/**
 * an alloy layer can be drawn on top of the map to render features or other visualisations
 */
export interface AlloyLayer {
  /**
   * unique identifier for the layer
   */
  readonly id: string;

  /**
   * the map the alloy layer was created for
   */
  readonly map: AlloyMap;

  /**
   * the openlayers layer instance for the alloy layer
   * @ignore
   * @internal
   */
  readonly olLayers: Readonly<OLLayer[]>;

  /**
   * the processor for styles on the layer, null until initialised
   * @ignore
   * @internal
   */
  readonly styleProcessor: AlloyStyleProcessor | null;

  /**
   * gets an alloy feature by its id
   * @param id the feature id
   */
  getFeatureById(id: string): AlloyFeature | null;

  /**
   * disposes of the alloy layer, should clear up any resources
   * @ignore
   * @internal
   */
  dispose(): void;

  /**
   * creates a copy of a layer
   * @param map other map where the copy of a layer will be displayed
   */
  clone(map: AlloyMap): AlloyLayer;
}
