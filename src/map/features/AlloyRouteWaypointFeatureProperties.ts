import { AlloyConnectedFeatureProperties } from './AlloyConnectedFeatureProperties';

/**
 * the properties for an alloy route waypoint feature
 */
export interface AlloyRouteWaypointFeatureProperties extends AlloyConnectedFeatureProperties {
  /**
   * the icon of the feature
   */
  readonly icon?: string;

  /**
   * the text of the feature
   */
  readonly text?: string;
}
