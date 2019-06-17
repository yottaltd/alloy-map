import { LineString, Point } from 'geojson';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyRouteFeature } from '../../features/AlloyRouteFeature';
import { AlloyRouteFeatureFactory } from '../../features/AlloyRouteFeatureFactory';
import { AlloyRouteFeatureProperties } from '../../features/AlloyRouteFeatureProperties';
import { AlloyRouteWaypointFeature } from '../../features/AlloyRouteWaypointFeature';
// tslint:disable-next-line:max-line-length
import { AlloyRouteWaypointFeatureProperties } from '../../features/AlloyRouteWaypointFeatureProperties';
import { AlloyAnimationLayer } from '../animation/AlloyAnimationLayer';
import { AlloyRouteAnimationManager } from './AlloyRouteAnimationManager';
import { AlloyRouteLayerOptions } from './AlloyRouteLayerOptions';
import { AlloyRouteStyleProcessor } from './AlloyRouteStyleProcessor';

/**
 * an alloy route layer for rendering route and waypoint features provided externally on the map,
 * use this to add route features onto the map and animate them automatically
 */
export class AlloyRouteLayer extends AlloyAnimationLayer {
  /**
   * animation manager for routes
   * @override
   * @ignore
   * @internal
   */
  protected readonly animationManager: AlloyRouteAnimationManager;

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
    this.animationManager = new AlloyRouteAnimationManager(this.map);
  }
  /**
   * creates a new route waypoint instance from a point geoemtry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param geometry the geojson Point object
   */
  public createRouteWaypoint(
    id: string,
    properties: AlloyRouteWaypointFeatureProperties,
    geometry: Point,
  ): AlloyRouteWaypointFeature {
    return AlloyRouteFeatureFactory.createRouteWaypoint(id, properties, geometry);
  }
  /**
   * creates a new route instance from a line geoemtry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param geometry the geojson LineString object
   */
  public createRoute(
    id: string,
    properties: AlloyRouteFeatureProperties,
    geometry: LineString,
  ): AlloyRouteFeature {
    return AlloyRouteFeatureFactory.createRoute(id, properties, geometry, this);
  }

  /**
   * Sets route feature and starts animation
   * @param route route feature
   */
  public setRouteFeature(route: AlloyRouteFeature) {
    // clear existing feature animation if applicable
    if (this.routeFeature !== null) {
      this.animationManager.stopFeatureAnimation(this.routeFeature);
    }

    // setup the new route feature and animate
    this.routeFeature = route;
    this.olSourceAnimatedLines.clear(false);
    this.olSourceAnimatedLines.addFeature(this.routeFeature.olFeature);
    this.animationManager.startAnimation(this.routeFeature, this.olLayerConnectedUnits);
    this.addAllConnectorLines();
  }

  /**
   * Sets waypoint features for route
   * @param waypoints array of waypoint features
   */
  public setWaypointFeatures(waypoints: AlloyRouteWaypointFeature[]) {
    this.waypointFeatures.clear();
    this.olSourceConnectedUnits.clear(false);

    this.olSourceConnectedUnits.addFeatures(waypoints.map((w) => w.olFeature));
    waypoints.forEach((w) => this.waypointFeatures.set(w.id, w));
    this.addAllConnectorLines();
  }

  /**
   * Clears the layer and stops route animation
   */
  public clear() {
    // remove any animating feature
    if (this.routeFeature) {
      this.animationManager.stopFeatureAnimation(this.routeFeature);
    }

    this.routeFeature = null;
    this.olSourceAnimatedLines.clear(false);
    this.olSourceConnectedUnits.clear(false);

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
  public dispose() {
    this.animationManager.clearAnimations();
  }
}
