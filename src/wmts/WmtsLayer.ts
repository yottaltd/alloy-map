import { WmtsStyle } from '@/wmts/WmtsStyle';

/**
 * wmts layer object describing the layer from a wmts service
 */
export interface WmtsLayer {
  /**
   * WMTS Name of layer
   */
  readonly Identifier: string;

  /**
   * Human readable title of the layer
   */
  readonly Title: string;

  /**
   * Bounding box of layer, calculated by openlayers WMTSCapabilties parsers
   */
  readonly WGS84BoundingBox: number[];

  /**
   * Styles associated with this layer
   */
  readonly Style: WmtsStyle[];

  /**
   * Array of Tile Matrices supported by this layer
   */
  readonly TileMatrixSetLink: Array<{ TileMatrixSet: string }>;
}
