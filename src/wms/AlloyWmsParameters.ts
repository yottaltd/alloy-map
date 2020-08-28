import { AlloyBounds } from '@/map/core/AlloyBounds';
import { AlloyWmsParametersLayer } from '@/wms/AlloyWmsParametersLayer';

/**
 * Parameters for tile WMS layer requests
 */
export interface AlloyWmsParameters {
  /**
   * base url for WMS service
   */
  url: string;

  /**
   * optional background colour
   */
  colour?: string;
  /**
   * Array of WMS layers to request
   */
  layers: AlloyWmsParametersLayer[];
  /**
   * Tile width used in request
   */
  width?: number;
  /**
   * Tile height used in request
   */
  height?: number;
  /**
   * CRS used in tile request
   */
  crs?: string;
  /**
   * bbox for tile requests
   */
  bbox?: AlloyBounds;
  /**
   * optional watermark
   */
  watermark?: string;
}
