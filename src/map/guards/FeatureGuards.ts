import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyFeatureType } from '../features/AlloyFeatureType';
import { AlloyFeatureWithItemId } from '../features/AlloyFeatureWithItemId';
import { AlloyItemFeature } from '../features/AlloyItemFeature';

/**
 * guards for features
 */
export abstract class FeatureGuards {
  /**
   * guard to check alloy feature has an item id
   * @param feature the feature to check
   */
  public static isAlloyFeatureWithItemId(
    feature: AlloyFeature,
  ): feature is AlloyFeature & AlloyFeatureWithItemId {
    return feature.hasOwnProperty('itemId') && typeof (feature as any).itemId === 'string';
  }

  /**
   * guard to check alloy feature is an item feature
   * @param feature the feature to check
   */
  public static isAlloyItemFeature(feature: AlloyFeature): feature is AlloyItemFeature {
    return feature.type === AlloyFeatureType.Item;
  }
}
