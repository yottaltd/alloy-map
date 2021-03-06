import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';
import { AlloyPathNodeFeature } from '@/map/features/AlloyPathNodeFeature';
// eslint-disable-next-line max-len
import { AlloyRouteWaypointFeatureProperties } from '@/map/features/AlloyRouteWaypointFeatureProperties';

/**
 * an alloy Route waypoint feature which represents a Route waypoint with point geometry
 */
export class AlloyRouteWaypointFeature extends AlloyPathNodeFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.RouteWaypoint; // see end of file for prototype

  /**
   * @implements
   */
  public allowsHover!: false; // see end of file for prototype
  /**
   * @implements
   */
  public allowsSelection!: false; // see end of file for prototype

  /**
   * @implements
   */
  public readonly properties!: Readonly<AlloyRouteWaypointFeatureProperties>;
}
/**
 * we are prototyping this property because it is the same on every single instance of this class.
 * there is no built in typescript way to define this without it being turned into an initialised
 * property (set on each constructor) and due to the frequency that these objects are created we
 * really need every small optimisation we can get with regard to features
 */
AlloyRouteWaypointFeature.prototype.type = AlloyFeatureType.RouteWaypoint;
AlloyRouteWaypointFeature.prototype.allowsSelection = false;
AlloyRouteWaypointFeature.prototype.allowsHover = false;
