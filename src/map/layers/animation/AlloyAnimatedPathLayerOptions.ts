import { AlloyMap } from '../../core/AlloyMap';

/**
 * options for the alloy animation layer
 */
export interface AlloyAnimatedPathLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * Optional id for animation layer
   */
  id?: string;
}
