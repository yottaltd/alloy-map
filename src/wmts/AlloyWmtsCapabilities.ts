import { AlloyWmtsCapabilitiesLayer } from '@/wmts/AlloyWmtsCapabilitiesLayer';
import { WmtsCapabilities } from '@/wmts/WmtsCapabilities';

/**
 * Parsed WMTS Capabilties parameters
 */
export interface AlloyWmtsCapabilities {
  /**
   * Title of the WMTS service
   */
  title: string;
  /**
   * Base url of the WMTS service
   */
  url: string;
  /**
   * Layers of the WMS service
   */
  layers: AlloyWmtsCapabilitiesLayer[];
  /**
   * Original parsed WMTS capabilities
   */
  capabilities: WmtsCapabilities;
}
