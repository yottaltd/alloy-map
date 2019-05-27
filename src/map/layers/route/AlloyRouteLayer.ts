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
   */
  public readonly debugger: Debugger;

  public readonly id: string;
  public readonly map: AlloyMap;
  public readonly olLayers: Readonly<OLVectorLayer[]>;
  public readonly styleProcessor: AlloyStyleProcessor | null;

  public readonly olSourceRoute: OLVectorSource = new OLVectorSource();
  public readonly olSourceWaypoints: OLVectorSource = new OLVectorSource();

  private routeFeature: AlloyFeature | null = null;
  private waypointFeatures: Map<string, AlloyFeature> = new Map();

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyRouteLayerOptions) {
    this.id = options.id ? options.id : AlloyRouteLayer.name + ':' + uuid.v1();
    this.map = options.map;
    this.debugger = this.map.debugger.extend(AlloyRouteLayer.name + ':' + this.id);

    this.styleProcessor = new AlloyRouteStyleProcessor(this);

    this.olLayers = [
      new OLVectorLayer({
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
      }),
      new OLVectorLayer({
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
        zIndex: AlloyLayerZIndex.Top,
      }),
    ];
  }

  /**
   * Sets route feature and starts animation
   * @param route route feature
   */
  public setRouteFeature(route: AlloyFeature) {
    if (this.routeFeature !== null) {
      this.map.animationUtils.stopFeatureAnimation(this.routeFeature);
    }
    this.routeFeature = route;
    this.olSourceRoute.clear(false);
    this.olSourceRoute.addFeature(this.routeFeature.olFeature);
    this.map.animationUtils.startRouteAnimation(this.routeFeature, this.olLayers[1]);
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
      this.map.animationUtils.stopFeatureAnimation(this.routeFeature);
    }
    this.olSourceRoute.clear(false);
    this.olSourceWaypoints.clear(false);
  }

  /**
   * Gets a route or waypoint feature by id
   * @param id id of waypoint or route feature
   */
  public getFeatureById(id: string): AlloyFeature | null {
    if (this.routeFeature && this.routeFeature.id === id) {
      return this.routeFeature;
    }
    return this.waypointFeatures.get(id) || null;
  }
}
