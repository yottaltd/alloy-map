import { AlloyMap } from '../../core/AlloyMap';
import { AlloyWfsLayerStyle } from '../../styles/AlloyWfsLayerStyle';

/**
 * options for the alloy custom layer
 */
export interface AlloyWfsLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * optional id for custom layer
   */
  id?: string;

  /**
   * Wfs Parameters for ol layers
   */
  styles: AlloyWfsLayerStyle[];
}
