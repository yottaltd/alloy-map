import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyWmsParameters } from '@/wms/AlloyWmsParameters';

/**
 * options for the alloy WMS layer
 */
export interface AlloyWmsLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * parameters of the WMS service
   */
  options: AlloyWmsParameters;

  /**
   * id for wms layer, must be unique
   */
  id: string;
}
