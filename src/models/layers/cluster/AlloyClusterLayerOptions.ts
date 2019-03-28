import { AlloyBounds } from '../../core/AlloyBounds';

/**
 * options for the alloy cluster layer
 */
export interface AlloyClusterLayerOptions {
  /**
   * the layer code
   */
  layerCode: string;

  /**
   * the bounds of the layer to make requests within
   */
  extent: AlloyBounds;
}
