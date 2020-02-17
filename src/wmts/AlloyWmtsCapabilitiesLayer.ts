import { AlloyBounds } from '../map/core/AlloyBounds';
import { AlloyWmtsCapabilitiesLayerStyle } from './AlloyWmtsCapabilitiesLayerStyle';

/**
 * WMTS Capabilties layer parameters
 */
export interface AlloyWmtsCapabilitiesLayer {
  /**
   * Title of the layer (displayed to user)
   */
  title: string;
  /**
   * Identifier for layer request
   */
  identifier: string;
  /**
   * Available styles for layer
   */
  styles: AlloyWmtsCapabilitiesLayerStyle[];
  /**
   * Bounds of this WMTS layer
   */
  boundingBox: AlloyBounds;
  /**
   * Tile matrix that is used for layer
   */
  tileMatrixIdentifier: string;
}