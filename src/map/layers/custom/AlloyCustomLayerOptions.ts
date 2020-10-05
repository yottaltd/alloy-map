import { AlloyMap } from '@/map/core/AlloyMap';

/**
 * options for the alloy custom layer
 */
export interface AlloyCustomLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * id for custom layer, must be unique
   */
  id: string;
}
