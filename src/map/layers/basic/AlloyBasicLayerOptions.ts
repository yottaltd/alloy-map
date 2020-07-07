import { AlloyBounds } from '../../core/AlloyBounds';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyLayerStyle } from '../../styles/AlloyLayerStyle';

/**
 * options for the alloy basic layer
 */
export interface AlloyBasicLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * the layer code
   */
  layerCode: string;

  /**
   * optional id for layer
   */
  id?: string;

  /**
   * the bounds of the layer to make requests within
   */
  bounds: AlloyBounds;

  /**
   * the styles to show on the layer
   */
  styles: AlloyLayerStyle[];
}
