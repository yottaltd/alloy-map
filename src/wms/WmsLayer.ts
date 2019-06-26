import { WmsStyle } from './WmsStyle';

/**
 * Parsed WMS Capabilties layer
 */
export interface WmsLayer {
  /**
   * WMS Name of layer, undefined if layer is not requestable
   */
  Name?: string;
  /**
   * Human readable title of the layer
   */
  Title: string;
  /**
   * Bounding box of layer, calculated by openlayers WMSCapabilties parsers
   */
  EX_GeographicBoundingBox?: number[];
  /**
   * CRS codes supported by the layer
   */
  CRS?: string[];
  /**
   * Whether layer is opaque or not
   */
  opaque?: boolean;
  /**
   * Fixed width for tile dimensions
   */
  fixedWidth?: number;
  /**
   * Fixed height for tile dimensions
   */
  fixedHeight?: number;
  /**
   * Children layers
   */
  Layer?: WmsLayer[];
  /**
   * Styles associated with this layer
   */
  Style?: WmsStyle[];
}
