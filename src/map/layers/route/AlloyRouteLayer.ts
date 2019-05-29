import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import * as uuid from 'uuid';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '../../styles/AlloyStyleProcessor';
import { AlloyLayer } from '../AlloyLayer';
import { AlloyRouteLayerOptions } from './AlloyRouteLayerOptions';
import { AlloyRouteStyleProcessor } from './AlloyRouteStyleProcessor';

/**
 * an alloy route layer for rendering route and waypoint features provided externally on the map,
 * use this to add route features onto the map and animate them automatically
 */
export class AlloyRouteLayer implements AlloyLayer {
  /**
   * debugger instance
   * @ignore
   * @internal
   */
  public readonly debugger: Debugger;

  /**
   * @implements
   */
  public readonly id: string;

  /**
   * @implements
   */
  public readonly map: AlloyMap;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public readonly olLayers: Readonly<OLVectorLayer[]>;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public readonly styleProcessor: AlloyStyleProcessor | null;

  /**
   * source to hold the openlayers route features
   */
  private readonly olSourceRoute: OLVectorSource = new OLVectorSource();

  /**
   * openlayers layer for route
   */
  private readonly olLayerRoute: OLVectorLayer;

  /**
   * source to hold the openlayers waypoint features
   */
  private readonly olSourceWaypoints: OLVectorSource = new OLVectorSource();

  /**
   * openlayers layer for waypoints
   */
  private readonly olLayerWaypoints: OLVectorLayer;

  /**
   * the route feature being displayed
   */
  private routeFeature: AlloyFeature | null = null;

  /**
   * the waypoint features being displayed
   */
  private waypointFeatures: Map<string, AlloyFeature> = new Map();

  /**
   * creates a new instance
   * @param options the options for the layer
   * @ignore
   * @internal
   */
  constructor(options: AlloyRouteLayerOptions) {
    this.id = options.id ? options.id : AlloyRouteLayer.name + ':' + uuid.v1();
    this.map = options.map;
    this.debugger = this.map.debugger.extend(AlloyRouteLayer.name + ':' + this.id);

    this.styleProcessor = new AlloyRouteStyleProcessor(this);

    this.olLayerRoute = new OLVectorLayer({
      // vector mode as it is more accurate for rendering, but maybe consider "image" in future?
      renderMode: 'vector',
      // set the styling for the layer, we use an arrow function here else "this" resolves wrong
      style: (olFeature, resolution) => {
        if (this.styleProcessor) {
          return this.styleProcessor.onStyleProcess(
            olFeature,
            resolution,
            AlloyStyleBuilderBuildState.Hover,
          );
        } else {
          this.debugger('style processor called but not set');
          return null;
        }
      },
      source: this.olSourceRoute,
      zIndex: AlloyLayerZIndex.Layers,
    });

    this.olLayerWaypoints = new OLVectorLayer({
      // vector mode as it is more accurate for rendering, but maybe consider "image" in future?
      renderMode: 'vector',
      // set the styling for the layer, we use an arrow function here else "this" resolves wrong
      style: (olFeature, resolution) => {
        if (this.styleProcessor) {
          return this.styleProcessor.onStyleProcess(
            olFeature,
            resolution,
            AlloyStyleBuilderBuildState.Default,
          );
        } else {
          this.debugger('style processor called but not set');
          return null;
        }
      },
      source: this.olSourceWaypoints,
      zIndex: AlloyLayerZIndex.Visualisation,
    });

    this.olLayers = [this.olLayerRoute, this.olLayerWaypoints];
  }

  /**
   * Sets route feature and starts animation
   * @param route route feature
   */
  public setRouteFeature(route: AlloyFeature) {
    if (this.routeFeature !== null) {
      this.map.animationManager.stopFeatureAnimation(this.routeFeature);
    }
    this.routeFeature = route;
    this.olSourceRoute.clear(false);
    this.olSourceRoute.addFeature(this.routeFeature.olFeature);
    this.map.animationManager.startRouteAnimation(this.routeFeature, this.olLayerWaypoints);
  }

  /**
   * Sets waypoint features for route
   * @param waypoints array of waypoint features
   */
  public setWaypointFeatures(waypoints: AlloyFeature[]) {
    this.waypointFeatures.clear();
    this.olSourceWaypoints.clear(false);

    waypoints.forEach((w) => this.waypointFeatures.set(w.id, w));
    this.olSourceWaypoints.addFeatures(waypoints.map((w) => w.olFeature));
  }

  /**
   * Clears the layer and stops route animation
   */
  public clear() {
    if (this.routeFeature) {
      this.map.animationManager.stopFeatureAnimation(this.routeFeature);
    }
    this.olSourceRoute.clear(false);
    this.olSourceWaypoints.clear(false);
  }

  /**
   * @implements
   * @ignore
   * @internal
   */
  public getFeatureById(id: string): AlloyFeature | null {
    // see if we match the only route feature first
    if (this.routeFeature && this.routeFeature.id === id) {
      return this.routeFeature;
    }

    // then try waypoints
    return this.waypointFeatures.get(id) || null;
  }
}
