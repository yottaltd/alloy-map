import { AlloyFeature } from '@/map/features/AlloyFeature';

/**
 * represents a result for finding features from a location
 */
export interface FindFeaturesWithinResult {
  /**
   * the feature that was found
   */
  feature: AlloyFeature;

  /**
   * the distance from the source location in metres
   */
  distance: number;
}
