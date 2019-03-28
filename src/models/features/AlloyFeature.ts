import OLFeature from 'ol/Feature';
import { AlloyFeatureType } from './AlloyFeatureType';

/**
 * an alloy feature is used to display objects on the map
 */
export interface AlloyFeature {
  /**
   * the features type
   */
  readonly type: AlloyFeatureType;

  /**
   * the underlying openlayers geojson feature
   */
  readonly olFeature: OLFeature;
}
