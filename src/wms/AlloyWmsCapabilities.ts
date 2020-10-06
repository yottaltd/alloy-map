import { AlloyWmsCapabilitiesLayer } from '@/wms/AlloyWmsCapabilitiesLayer';

/**
 * Parsed WMS Capabilties parameters
 */
export interface AlloyWmsCapabilities {
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
  layer: AlloyWmsCapabilitiesLayer;
}
