/* eslint-disable max-len */

import { AlloyAnimationManager } from '@/map/animations/AlloyAnimationManager';
import { AlloyLayerZIndex } from '@/map/core/AlloyLayerZIndex';
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyAnimatedPathFeature } from '@/map/features/AlloyAnimatedPathFeature';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyPathNodeConnectorFeature } from '@/map/features/AlloyPathNodeConnectorFeature';
import { AlloyPathNodeFeature } from '@/map/features/AlloyPathNodeFeature';
import { AlloyLayer } from '@/map/layers/AlloyLayer';
import { AlloyAnimatedPathLayerOptions } from '@/map/layers/animation/AlloyAnimatedPathLayerOptions';
import { AlloyAnimatedPathStyleProcessor } from '@/map/layers/animation/AlloyAnimatedPathStyleProcessor';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { Debugger } from 'debug';
import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import OLStyle from 'ol/style/Style';

/* eslint-enable max-len */

/**
 * prefix for connector feature ids
 * @ignore
 * @internal
 */
const CONNECTOR_ID = 'connector:';
/**
 * abstract class for alloy animated path layer
 * that holds an animated feature (line string) and connected units (points)
 * and draws connector lines between these
 */
export abstract class AlloyAnimatedPathLayer implements AlloyLayer {
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
  public readonly styleProcessor: AlloyAnimatedPathStyleProcessor<
    AlloyAnimatedPathFeature | AlloyPathNodeFeature
  >;

  /**
   * abstract animation manager should be set in derived class
   * @ignore
   * @internal
   */
  public abstract readonly animationManager: AlloyAnimationManager;

  /**
   * source to hold the animated linestring features
   * @ignore
   * @internal
   */
  protected readonly olSourceAnimatedPaths: OLVectorSource = new OLVectorSource();

  /**
   * source to hold the point path nodes features
   * @ignore
   * @internal
   */
  protected readonly olSourcePathNodes: OLVectorSource = new OLVectorSource();

  /**
   * source to hold the linestring connector line features that connect paths to nodes
   * @ignore
   * @internal
   */
  protected readonly olSourcePathNodeConnectors: OLVectorSource = new OLVectorSource();
  /**
   * internal map for
   * @ignore
   * @internal
   */
  protected connectorLineFeatures: Map<string, AlloyPathNodeConnectorFeature> = new Map();

  /**
   * openlayers layer for path nodes
   * @ignore
   * @internal
   */
  protected readonly olLayerPathNodes: OLVectorLayer;

  /**
   * openlayers layer for path node connectors
   * @ignore
   * @internal
   */
  protected readonly olLayerPathNodeConnectors: OLVectorLayer;

  /**
   * openlayers layer for animated path
   * @ignore
   * @internal
   */
  protected readonly olLayerAnimatedPaths: OLVectorLayer;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyAnimatedPathLayerOptions) {
    this.id = options.id;
    this.map = options.map;
    this.debugger = this.map.debugger.extend(AlloyAnimatedPathLayer.name + ':' + this.id);
    this.styleProcessor = this.createStyleProcessor();

    this.olLayerAnimatedPaths = new OLVectorLayer({
      // set the styling for the layer, we use an arrow function here else "this" resolves wrong
      style: (olFeature, resolution): OLStyle | OLStyle[] => {
        if (this.styleProcessor) {
          return this.styleProcessor.onStyleProcess(
            olFeature,
            resolution,
            AlloyStyleBuilderBuildState.Hover,
          );
        } else {
          return [];
        }
      },
      source: this.olSourceAnimatedPaths,
      zIndex: AlloyLayerZIndex.Layers,
    });

    this.olLayerPathNodes = new OLVectorLayer({
      // set the styling for the layer, we use an arrow function here else "this" resolves wrong
      style: (olFeature, resolution): OLStyle | OLStyle[] => {
        if (this.styleProcessor) {
          return this.styleProcessor.onStyleProcess(
            olFeature,
            resolution,
            AlloyStyleBuilderBuildState.Hover,
          );
        } else {
          return [];
        }
      },
      source: this.olSourcePathNodes,
      zIndex: AlloyLayerZIndex.Visualisation,
    });

    this.olLayerPathNodeConnectors = new OLVectorLayer({
      // set the styling for the layer, we use an arrow function here else "this" resolves wrong
      style: (olFeature, resolution): OLStyle | OLStyle[] => {
        if (this.styleProcessor) {
          return this.styleProcessor.onStyleProcess(
            olFeature,
            resolution,
            AlloyStyleBuilderBuildState.Default,
          );
        } else {
          return [];
        }
      },
      source: this.olSourcePathNodeConnectors,
      zIndex: AlloyLayerZIndex.SubLayers,
    });

    this.olLayers = [
      this.olLayerAnimatedPaths,
      this.olLayerPathNodes,
      this.olLayerPathNodeConnectors,
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
   * @implements
   */
  public dispose(): void {
    this.animationManager.clearAnimations();
  }

  /**
   * @implements
   */
  public abstract clone(map: AlloyMap): AlloyAnimatedPathLayer;

  /**
   * Creates style processor for given sub-class
   * @ignore
   * @internal
   */
  protected abstract createStyleProcessor(): AlloyAnimatedPathStyleProcessor<
    AlloyAnimatedPathFeature | AlloyPathNodeFeature
  >;

  /**
   * Clears all connector lines
   * @ignore
   * @internal
   */
  protected clearConnectorLines(): void {
    this.connectorLineFeatures.clear();
    this.olSourcePathNodeConnectors.clear();
  }

  /**
   * Removes connector line for given connected feature
   * @param feature connected point feature for which to remove connector line
   * @ignore
   * @internal
   */
  protected removeConnectorLine(feature: AlloyPathNodeFeature): void {
    const lineFeature = this.connectorLineFeatures.get(feature.id);
    if (lineFeature) {
      this.olSourcePathNodeConnectors.removeFeature(lineFeature.olFeature);
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
  protected addConnectorLine(
    feature: AlloyPathNodeFeature,
    animated: AlloyAnimatedPathFeature,
  ): void {
    this.removeConnectorLine(feature);

    const unitCoordinate = feature.getExpectedGeometry().getCoordinates();
    const closestCablePoint = animated.olFeature.getGeometry().getClosestPoint(unitCoordinate);
    const connectorFeature = new AlloyPathNodeConnectorFeature(
      CONNECTOR_ID + feature.id,
      new OLFeature(new OLLineString([unitCoordinate, closestCablePoint])),
      {
        colour: feature.properties.colour,
      },
    );

    this.connectorLineFeatures.set(feature.id, connectorFeature);
    this.olSourcePathNodeConnectors.addFeature(connectorFeature.olFeature);
  }
}
