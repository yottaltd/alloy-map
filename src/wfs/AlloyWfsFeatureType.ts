import { AlloyBounds } from '../map/core/AlloyBounds';

/**
 * an alloy wfs feature type parameters
 */
export interface AlloyWfsFeatureType {
  /**
   * feature type name used in WFS requests
   */
  name: string;
  /**
   * feature type title
   */
  title: string;
  /**
   * Bounding box of this feature type
   */
  bbox: AlloyBounds;
  /**
   * Epsg code of feature type
   */
  epsg: number;
}
