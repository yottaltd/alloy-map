import OLLayer from 'ol/layer/Layer';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyStyleProcessor } from '../styles/AlloyStyleProcessor';

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
   */
  readonly olLayer: Readonly<OLLayer>;

  /**
   * the processor for styles on the layer, null until initialised
   * @ignore
   */
  readonly styleProcessor: AlloyStyleProcessor | null;

  /**
   * gets an alloy feature by its id
   * @param id the feature id
   */
  getFeatureById(id: string): AlloyFeature | null;
}
