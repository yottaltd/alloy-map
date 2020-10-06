import { WmtsLayer } from '@/wmts/WmtsLayer';
import { WmtsTileMatrixSet } from '@/wmts/WmtsTileMatrixSet';

/**
 * wmts capabilities object describing the capabilities of a wmts service
 */
export interface WmtsCapabilities {
  /**
   * Human readable title of the WMS service
   */
  readonly Title: string;

  /**
   * Layers for this WMTS service
   */
  readonly Layers: WmtsLayer[];

  /**
   * Matrix set
   */
  readonly TileMatrixSet: WmtsTileMatrixSet[];

  /**
   * Default caps returned by openlayers
   */
  readonly DefaultCaps: unknown;
}
