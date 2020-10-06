import { WmsStyle } from '@/wms/WmsStyle';

/**
 * wms layer object describing the layer from a wms service
 */
export interface WmsLayer {
  /**
   * WMS Name of layer, undefined if layer is not requestable
   */
  readonly Name?: string;

  /**
   * Human readable title of the layer
   */
  readonly Title: string;

  /**
   * Bounding box of layer, calculated by openlayers WMSCapabilties parsers
   */
  readonly EX_GeographicBoundingBox?: number[];

  /**
   * CRS codes supported by the layer
   */
  readonly CRS?: string[];

  /**
   * Whether layer is opaque or not
   */
  readonly opaque?: boolean;

  /**
   * Fixed width for tile dimensions
   */
  readonly fixedWidth?: number;

  /**
   * Fixed height for tile dimensions
   */
  readonly fixedHeight?: number;

  /**
   * Children layers
   */
  readonly Layer?: WmsLayer[];

  /**
   * Styles associated with this layer
   */
  readonly Style?: WmsStyle[];

  /**
   * Whether layer can be queried
   */
  readonly queryable?: boolean;
}
