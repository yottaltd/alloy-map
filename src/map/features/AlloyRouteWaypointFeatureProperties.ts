import { AlloyPathNodeFeatureProperties } from './AlloyPathNodeFeatureProperties';

/**
 * the properties for an alloy route waypoint feature
 */
export interface AlloyRouteWaypointFeatureProperties extends AlloyPathNodeFeatureProperties {
  /**
   * the icon of the feature
   */
  readonly icon?: string;

  /**
   * the text of the feature
   */
  readonly text?: string;
}