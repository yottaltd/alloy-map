import { AlloyBounds } from '@/map/core/AlloyBounds';
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyLayerStyle } from '@/map/styles/AlloyLayerStyle';

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
   * id for layer, must be unique
   */
  id: string;

  /**
   * the bounds of the layer to make requests within
   */
  bounds: AlloyBounds;

  /**
   * the styles to show on the layer
   */
  styles: AlloyLayerStyle[];
}
