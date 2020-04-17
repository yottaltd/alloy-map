import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyRouteFeature } from '../../features/AlloyRouteFeature';
import { AlloyRouteWaypointFeature } from '../../features/AlloyRouteWaypointFeature';
import { AlloyManagedLayer } from '../AlloyManagedLayer';
import { AlloyAnimatedPathLayer } from '../animation/AlloyAnimatedPathLayer';
import { AlloyRouteAnimationManager } from './AlloyRouteAnimationManager';
import { AlloyRouteLayerOptions } from './AlloyRouteLayerOptions';
import { AlloyRouteStyleProcessor } from './AlloyRouteStyleProcessor';

/**
 * an alloy route layer for rendering route and waypoint features provided externally on the map,
 * use this to add route features onto the map and animate them automatically
 */
export class AlloyRouteLayer extends AlloyAnimatedPathLayer implements AlloyManagedLayer {
  /**
   * animation manager for routes
   * @override
   * @ignore
   * @internal
   */
  public readonly animationManager: AlloyRouteAnimationManager;

  /**
   * the route feature being displayed
   */
  private routeFeature: AlloyRouteFeature | null = null;

  /**
   * the waypoint features being displayed
   */
  private waypointFeatures: Map<string, AlloyRouteWaypointFeature> = new Map();

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyRouteLayerOptions) {
    super(options);
    this.animationManager = new AlloyRouteAnimationManager(this.map, this.olLayerPathNodes);
  }

  /**
   * Sets route feature and starts animation
   * @param route route feature
   */
  public setRouteFeature(route: AlloyRouteFeature) {
    // clear existing feature animation if applicable
    if (this.routeFeature !== null) {
      this.animationManager.stopAnimation(this.routeFeature);
    }

    // setup the new route feature and animate
    this.routeFeature = route;
    this.olSourceAnimatedPaths.clear(false);
    this.olSourceAnimatedPaths.addFeature(this.routeFeature.olFeature);
    this.animationManager.startAnimation(this.routeFeature);
    this.addAllConnectorLines();
  }

  /**
   * Sets waypoint features for route
   * @param waypoints array of waypoint features
   */
  public setWaypointFeatures(waypoints: AlloyRouteWaypointFeature[]) {
    this.waypointFeatures.clear();
    this.olSourcePathNodes.clear(false);

    this.olSourcePathNodes.addFeatures(waypoints.map((w) => w.olFeature));
    waypoints.forEach((w) => this.waypointFeatures.set(w.id, w));
    this.addAllConnectorLines();
  }

  /**
   * Clears the layer and stops route animation
   */
  public clear() {
    // remove any animating feature
    if (this.routeFeature) {
      this.animationManager.stopAnimation(this.routeFeature);
    }

    this.routeFeature = null;
    this.olSourceAnimatedPaths.clear(false);
    this.olSourcePathNodes.clear(false);

    this.clearConnectorLines();
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyFeature | null {
    // see if we match the only route feature first
    if (this.routeFeature && this.routeFeature.id === id) {
      return this.routeFeature;
    }

    // then try waypoints
    return this.waypointFeatures.get(id) || super.getFeatureById(id);
  }

  /**
   * @implements
   * @ignore
   * @internal
   */
  protected createStyleProcessor(): AlloyRouteStyleProcessor {
    return new AlloyRouteStyleProcessor(this);
  }

  /**
   * Adds connector lines for all waypoints
   * @ignore
   * @internal
   */
  private addAllConnectorLines() {
    this.clearConnectorLines();
    if (!this.routeFeature) {
      return;
    }

    for (const waypointFeature of Array.from(this.waypointFeatures.values())) {
      this.addConnectorLine(waypointFeature, this.routeFeature);
    }
  }

  /**
   * @implements
   */
  public enable(): void {
    if (this.routeFeature) {
      this.animationManager.startAnimation(this.routeFeature);
      this.routeFeature.allowsSelection = true;
    }
    this.olLayerAnimatedPaths.setOpacity(1);
    this.olLayerPathNodes.setOpacity(1);
    this.olLayerPathNodeConnectors.setOpacity(1);
  }

  /**
   * @implements
   */
  public disable(): void {
    if (this.routeFeature) {
      this.animationManager.stopAnimation(this.routeFeature);
      this.routeFeature.allowsSelection = false;
    }
    this.olLayerAnimatedPaths.setOpacity(0.25);
    this.olLayerPathNodes.setOpacity(0);
    this.olLayerPathNodeConnectors.setOpacity(0);
  }
}
