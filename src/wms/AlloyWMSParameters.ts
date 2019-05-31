import { AlloyWMSCapabilitiesLayer } from './AlloyWMSCapabilitiesLayer';

export interface AlloyWMSParameters {
  /**
   * base url for WMS service
   */
  url: string;
  /**
   * Array of WMS layers to request
   */
  layers: AlloyWMSCapabilitiesLayer[];
}
