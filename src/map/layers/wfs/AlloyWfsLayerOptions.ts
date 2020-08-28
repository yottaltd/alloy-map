import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyWfsLayerStyle } from '@/map/styles/AlloyWfsLayerStyle';

/**
 * options for the alloy custom layer
 */
export interface AlloyWfsLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * id for wfs layer, must be unique
   */
  id: string;

  /**
   * Wfs Parameters for ol layers
   */
  styles: AlloyWfsLayerStyle[];
}
