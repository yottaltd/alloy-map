import { WmsLayer } from './WmsLayer';

/**
 * wms capabilities object describing the capabilities of a wms service
 */
export interface WmsCapabilities {
  /**
   * Human readable title of the WMS service
   */
  readonly Title: string;

  /**
   * Wrapping layer for this WMS service
   */
  readonly Layer: WmsLayer;
}
