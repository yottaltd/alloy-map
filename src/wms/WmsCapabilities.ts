import { WmsLayer } from './WmsLayer';

/**
 * Parsed WMS Capabilties
 */
export interface WmsCapabilities {
  /**
   * Human readable title of the WMS service
   */
  Title: string;
  /**
   * Wrapping layer for this WMS service
   */
  Layer: WmsLayer;
}
