import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyFeatureWithItemId } from '../features/AlloyFeatureWithItemId';

export abstract class FeatureGuards {
  public static isAlloyFeatureWithItemId(
    feature: AlloyFeature,
  ): feature is AlloyFeature & AlloyFeatureWithItemId {
    return feature.hasOwnProperty('itemId') && typeof (feature as any).itemId === 'string';
  }
}
