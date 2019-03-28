import { AlloyBounds } from '../../core/AlloyBounds';
import { AlloyMap } from '../../core/AlloyMap';

/**
 * options for the alloy cluster layer
 */
export interface AlloyClusterLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * the layer code
   */
  layerCode: string;

  /**
   * the bounds of the layer to make requests within
   */
  extent: AlloyBounds;
}
