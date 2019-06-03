import { AlloyAnimatedFeature } from './AlloyAnimatedFeature';
import { AlloyFeatureType } from './AlloyFeatureType';
import { AlloyRouteFeatureProperties } from './AlloyRouteFeatureProperties';

/**
 * an alloy Route feature which represents a Route with single line string geometry
 */
export class AlloyRouteFeature extends AlloyAnimatedFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.Route; // see end of file for prototype

  /**
   * @implements
   */
  public readonly properties!: Readonly<AlloyRouteFeatureProperties>;
}

AlloyRouteFeature.prototype.type = AlloyFeatureType.Route;
