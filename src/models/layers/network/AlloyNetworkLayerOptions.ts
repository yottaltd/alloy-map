import { AlloyBounds } from '../../core/AlloyBounds';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyNetworkLayerStyle } from './AlloyNetworkLayerStyle';

/**
 * options for the alloy network layer
 */
export interface AlloyNetworkLayerOptions {
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
  bounds: AlloyBounds;

  /**
   * the styles to show on the layer
   */
  styles: AlloyNetworkLayerStyle[];
}
