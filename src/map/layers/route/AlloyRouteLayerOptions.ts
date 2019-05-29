import { AlloyMap } from '../../core/AlloyMap';

/**
 * options for the alloy route layer
 */
export interface AlloyRouteLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * Optional id for route layer
   */
  id?: string;
}
