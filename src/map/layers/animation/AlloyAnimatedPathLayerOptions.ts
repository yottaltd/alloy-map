import { AlloyMap } from '@/map/core/AlloyMap';

/**
 * options for the alloy animation layer
 */
export interface AlloyAnimatedPathLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * id for animation layer, must be unique
   */
  id: string;
}
