import { AlloyPathNodeFeatureProperties } from '@/map/features/AlloyPathNodeFeatureProperties';

/**
 * the properties for an alloy cable unit feature
 */
export interface AlloyCableUnitFeatureProperties extends AlloyPathNodeFeatureProperties {
  /**
   * the icon of the feature
   */
  readonly icon?: string;
}
