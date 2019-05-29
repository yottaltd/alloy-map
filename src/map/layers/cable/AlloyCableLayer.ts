import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import * as uuid from 'uuid';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyLayer } from '../AlloyLayer';
import { AlloyCableLayerOptions } from './AlloyCableLayerOptions';
import { AlloyCableStyleProcessor } from './AlloyCableStyleProcessor';

/**
 * an alloy cable layer for rendering cable and feeds features provided externally on the map,
 * use this to add cable features onto the map and animate them automatically
 */
export class AlloyCableLayer implements AlloyLayer {
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
  public readonly styleProcessor: AlloyCableStyleProcessor;

  /**
   * source to hold the openlayers cable features
   */
  private readonly olSourceCables: OLVectorSource = new OLVectorSource();

  /**
   * openlayers layer for cable
   */
  private readonly olLayerCables: OLVectorLayer;

  /**
   * source to hold the openlayers waypoint features
   */
  private readonly olSourceFeeds: OLVectorSource = new OLVectorSource();

  /**
   * openlayers layer for waypoints
   */
  private readonly olLayerFeeds: OLVectorLayer;

  /**
   * the cable features being displayed
   */
  private cableFeatures: Map<string, AlloyFeature> = new Map();

  /**
   * the waypoint features being displayed
   */
  private feedFeatures: Map<string, AlloyFeature> = new Map();

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyCableLayerOptions) {
    this.id = options.id ? options.id : AlloyCableLayer.name + ':' + uuid.v1();
    this.map = options.map;
    this.debugger = this.map.debugger.extend(AlloyCableLayer.name + ':' + this.id);

    this.styleProcessor = new AlloyCableStyleProcessor(this);

    this.olLayerCables = new OLVectorLayer({
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
      source: this.olSourceCables,
      zIndex: AlloyLayerZIndex.Layers,
    });

    this.olLayerFeeds = new OLVectorLayer({
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
      source: this.olSourceFeeds,
      zIndex: AlloyLayerZIndex.Visualisation,
    });

    this.olLayers = [this.olLayerCables, this.olLayerFeeds];
  }

  /**
   * Sets cable feature and starts animation
   * @param cable cable feature
   */
  public setCableFeatures(cables: AlloyFeature[]) {
    for (const cable of Array.from(this.cableFeatures.values())) {
      this.styleProcessor.animationManager.stopFeatureAnimation(cable);
    }
    this.olSourceCables.clear(false);
    this.olSourceCables.addFeatures(cables.map((f) => f.olFeature));
    for (const cable of cables) {
      this.cableFeatures.set(cable.id, cable);
      this.styleProcessor.animationManager.startAnimation(cable, this.olLayerFeeds);
    }
  }

  /**
   * Sets waypoint features for cable
   * @param waypoints array of waypoint features
   */
  public setFeedFeatures(waypoints: AlloyFeature[]) {
    this.feedFeatures.clear();
    this.olSourceFeeds.clear(false);

    waypoints.forEach((w) => this.feedFeatures.set(w.id, w));
    this.olSourceFeeds.addFeatures(waypoints.map((w) => w.olFeature));
  }

  /**
   * Clears the layer and stops cable animation
   */
  public clear() {
    for (const cable of Array.from(this.cableFeatures.values())) {
      this.styleProcessor.animationManager.stopFeatureAnimation(cable);
    }
    this.olSourceCables.clear(false);
    this.olSourceFeeds.clear(false);
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyFeature | null {
    return this.cableFeatures.get(id) || this.feedFeatures.get(id) || null;
  }
}
