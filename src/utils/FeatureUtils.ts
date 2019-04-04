import OLFeature from 'ol/Feature';
import { AlloyMapError } from '../error/AlloyMapError';

/**
 * the property name of the feature id stored on an openlayers feature (so we can go from openlayers
 * feature back to an alloy feature in rare circumstances)
 * @ignore
 */
const OL_FEATURE_TO_FEATURE_ID = '__AlloyFeatureId__';

/**
 * utils for features
 * @ignore
 */
export abstract class FeatureUtils {
  /**
   * creates a feature id in a consistent format
   * @param layerCode the layer the feature originated from when loaded
   * @param olFeature the feature that was loaded (should have an id)
   */
  public static createFeatureId(layerCode: string, olFeature: OLFeature): string {
    return layerCode + ':' + olFeature.getId();
  }

  /**
   * gets the consistent feature id given an openlayers feature
   * @param olFeature the openlayers feature to get the id from
   */
  public static getFeatureIdFromOlFeature(olFeature: OLFeature): string {
    const id: any = olFeature.getProperties()[OL_FEATURE_TO_FEATURE_ID];
    if (typeof id !== 'string') {
      throw new AlloyMapError(1554055460, 'failed to get feature id from ol feature', {
        data: {
          olFeature,
        },
      });
    }
    return id;
  }

  /**
   * sets a feature id on an openlayer feature
   * @param olFeature the openlayers feature to set the id on
   * @param id the id to set
   */
  public static setFeatureIdForOlFeature(olFeature: OLFeature, id: string): void {
    olFeature.setProperties({
      [OL_FEATURE_TO_FEATURE_ID]: id,
    });
  }
}
