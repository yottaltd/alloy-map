import { AlloyMap } from '../../core/AlloyMap';

/**
 * options for the alloy cable layer
 */
export interface AlloyCableLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * Optional id for cable layer
   */
  id?: string;
}
