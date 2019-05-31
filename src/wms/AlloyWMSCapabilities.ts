import { AlloyWMSCapabilitiesLayer } from './AlloyWMSCapabilitiesLayer';

export interface AlloyWMSCapabilities {
  /**
   * Title of the WMS service
   */
  title: string;
  /**
   * Base url of the WMS service
   */
  url: string;
  /**
   * Main layer of the WMS service
   */
  layer: AlloyWMSCapabilitiesLayer;
}
