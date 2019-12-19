import { Extent as OLExtent } from 'ol/extent';
import OLProjection from 'ol/proj/Projection';

/**
 * interface for feature loaders, these load information from a service to make it available in
 * a layers source for rendering
 * @ignore
 * @internal
 */
export interface AlloyFeatureLoader {
  /**
   * called when the feature loader should request more features
   * @param extent the extent of the current view
   * @param resolution the resolution of the current view
   * @param projection the projection used for the current view
   */
  loadFeatures(extent: OLExtent, resolution: number, projection: OLProjection): Promise<void>;
}
