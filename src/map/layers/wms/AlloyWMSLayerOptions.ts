import { AlloyMap } from '../../core/AlloyMap';
import { AlloyWMSParameters } from '../../../wms/AlloyWMSParameters';

/**
 * options for the alloy WMS layer
 */
export interface AlloyWMSLayerOptions {
  /**
   * the alloy map to associate tha layer with
   */
  map: AlloyMap;

  /**
   * parameters of the WMS service
   */
  options: AlloyWMSParameters;

  /**
   * optional id for custom layer
   */
  id?: string;
}
