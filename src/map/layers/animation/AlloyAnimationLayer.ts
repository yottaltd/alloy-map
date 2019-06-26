import { Debugger } from 'debug';
import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import * as uuid from 'uuid';
import { AlloyAnimationManager } from '../../animations/AlloyAnimationManager';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyAnimatedFeature } from '../../features/AlloyAnimatedFeature';
import { AlloyConnectedFeature } from '../../features/AlloyConnectedFeature';
import { AlloyConnectorFeature } from '../../features/AlloyConnectorFeature';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyStyleBuilderBuildState } from '../../styles/AlloyStyleBuilderBuildState';
import { AlloyLayer } from '../AlloyLayer';
import { AlloyAnimationLayerOptions } from './AlloyAnimationLayerOptions';
import { AlloyAnimationStyleProcessor } from './AlloyAnimationStyleProcessor';

/**
 * @ignore
 * @internal
 */
const CONNECTOR_ID = 'connector:';
/**
 * abstract class for alloy animation layer
 * that holds an animated feature (line string) and connected units (points)
 * and draws connector lines between these
 */
export abstract class AlloyAnimationLayer implements AlloyLayer {
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
  public readonly styleProcessor: AlloyAnimationStyleProcessor<
    AlloyAnimatedFeature | AlloyConnectedFeature
  >;

  /**
   * source to hold the openlayers cable features
   * @ignore
   * @internal
   */
  protected readonly olSourceAnimatedLines: OLVectorSource = new OLVectorSource();

  /**
   * source to hold the openlayers waypoint features
   * @ignore
   * @internal
   */
  protected readonly olSourceConnectedUnits: OLVectorSource = new OLVectorSource();

  /**
   * source to hold the openlayers connector line features
   * @ignore
   * @internal
   */
  protected readonly olSourceConnectorLines: OLVectorSource = new OLVectorSource();
  /**
   * internal map for
   * @ignore
   * @internal
   */
  protected connectorLineFeatures: Map<string, AlloyConnectorFeature> = new Map();

  /**
   * openlayers layer for waypoints
   * @ignore
   * @internal
   */
  protected readonly olLayerConnectedUnits: OLVectorLayer;

  /**
   * openlayers layer for connector lines
   * @ignore
   * @internal
   */
  protected readonly olLayerConnectorLines: OLVectorLayer;

  /**
   * abstract animation manager should be set in derived class
   * @ignore
   * @internal
   */
  protected readonly animationManager!: AlloyAnimationManager;

  /**
   * openlayers layer for cable
   */
  private readonly olLayerAnimatedLines: OLVectorLayer;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyAnimationLayerOptions) {
    this.id = options.id ? options.id : AlloyAnimationLayer.name + ':' + uuid.v1();
    this.map = options.map;
    this.debugger = this.map.debugger.extend(AlloyAnimationLayer.name + ':' + this.id);
    this.styleProcessor = this.createStyleProcessor();

    this.olLayerAnimatedLines = new OLVectorLayer({
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
          return null;
        }
      },
      source: this.olSourceAnimatedLines,
      zIndex: AlloyLayerZIndex.Layers,
    });

    this.olLayerConnectedUnits = new OLVectorLayer({
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
          return null;
        }
      },
      source: this.olSourceConnectedUnits,
      zIndex: AlloyLayerZIndex.Visualisation,
    });

    this.olLayerConnectorLines = new OLVectorLayer({
      // vector mode as it is more accurate for rendering, but maybe consider "image" in future?
      renderMode: 'vector',
      // set the styling for the layer, we use an arrow function here else "this" resolves wrong
      style: (olFeature, resolution) => {
        if (this.styleProcessor) {
          return this.styleProcessor.onStyleConnectorProcess(
            olFeature,
            resolution,
            AlloyStyleBuilderBuildState.Default,
          );
        } else {
          return null;
        }
      },
      source: this.olSourceConnectorLines,
      zIndex: AlloyLayerZIndex.Connectors,
    });

    this.olLayers = [
      this.olLayerAnimatedLines,
      this.olLayerConnectedUnits,
      this.olLayerConnectorLines,
    ];
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyFeature | null {
    for (const feature of Array.from(this.connectorLineFeatures.values())) {
      if (feature.id === id) {
        return feature;
      }
    }
    return null;
  }

  /**
   * Toggles feature animation
   * @param feature feature to animate
   * @ignore
   * @internal
   */
  public animateFeature(feature: AlloyAnimatedFeature, animate: boolean) {
    if (animate) {
      this.animationManager.startAnimation(feature);
    } else {
      this.animationManager.stopFeatureAnimation(feature);
    }
  }

  /**
   * @implements
   */
  public dispose() {
    this.animationManager.clearAnimations();
  }

  /**
   * Creates style processor for given sub-class
   * @ignore
   * @internal
   */
  protected abstract createStyleProcessor(): AlloyAnimationStyleProcessor<
    AlloyAnimatedFeature | AlloyConnectedFeature
  >;

  /**
   * Clears all connector lines
   * @ignore
   * @internal
   */
  protected clearConnectorLines() {
    this.connectorLineFeatures.clear();
    this.olSourceConnectorLines.clear();
  }

  /**
   * Removes connector line for given connected feature
   * @param feature connected point feature for which to remove connector line
   * @ignore
   * @internal
   */
  protected removeConnectorLine(feature: AlloyConnectedFeature) {
    const lineFeature = this.connectorLineFeatures.get(feature.id);
    if (lineFeature) {
      this.olSourceConnectorLines.removeFeature(lineFeature.olFeature);
    }
    this.connectorLineFeatures.delete(feature.id);
  }

  /**
   * Adds a connector line between connected point feature and animate line string feature
   * @param feature Point feature that should be connected to line
   * @param animated main line string feature that points are connected to
   * @ignore
   * @internal
   */
  protected addConnectorLine(feature: AlloyConnectedFeature, animated: AlloyAnimatedFeature) {
    this.removeConnectorLine(feature);

    const unitCoordinate = feature.getExpectedGeometry().getCoordinates();
    const closestCablePoint = animated.olFeature.getGeometry().getClosestPoint(unitCoordinate);
    const connectorFeature = new AlloyConnectorFeature(
      CONNECTOR_ID + feature.id,
      new OLFeature(new OLLineString([unitCoordinate, closestCablePoint])),
      {
        colour: feature.properties.colour,
      },
    );

    this.connectorLineFeatures.set(feature.id, connectorFeature);
    this.olSourceConnectorLines.addFeature(connectorFeature.olFeature);
  }
}
