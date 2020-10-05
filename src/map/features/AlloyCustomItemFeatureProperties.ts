import { AlloyCustomFeatureProperties } from '@/map/features/AlloyCustomFeatureProperties';

/**
 * the properties for an alloy custom feature
 */
export interface AlloyCustomItemFeatureProperties extends AlloyCustomFeatureProperties {
  /**
   * the item id of the feature
   */
  readonly itemId: string;
}
