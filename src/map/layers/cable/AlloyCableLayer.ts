import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyCableFeature } from '@/map/features/AlloyCableFeature';
import { AlloyCableUnitFeature } from '@/map/features/AlloyCableUnitFeature';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyAnimatedPathLayer } from '@/map/layers/animation/AlloyAnimatedPathLayer';
import { AlloyCableAnimationManager } from '@/map/layers/cable/AlloyCableAnimationManager';
import { AlloyCableLayerOptions } from '@/map/layers/cable/AlloyCableLayerOptions';
import { AlloyCableStyleProcessor } from '@/map/layers/cable/AlloyCableStyleProcessor';

/**
 * an alloy cable layer for rendering cable and feeds features provided externally on the map,
 * use this to add cable features onto the map and animate them automatically
 */
export class AlloyCableLayer extends AlloyAnimatedPathLayer {
  /**
   * animation manager for cables
   * @override
   * @ignore
   * @internal
   */
  public animationManager: AlloyCableAnimationManager;
  /**
   * the cable feature being displayed
   */
  private cableFeature: AlloyCableFeature | null = null;

  /**
   * the main feed feature being displayed
   */
  private mainFeedFeature: AlloyCableUnitFeature | null = null;

  /**
   * the sub feed feature being displayed
   */
  private subFeedFeature: AlloyCableUnitFeature | null = null;

  /**
   * the connected features being displayed
   */
  private connectedUnitsFeatures: Map<string, AlloyCableUnitFeature> = new Map();

  /**
   * Initialisation options for this layer.
   */
  private readonly options: AlloyCableLayerOptions;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyCableLayerOptions) {
    super(options);
    this.options = options;
    this.animationManager = new AlloyCableAnimationManager(this.map, this.olLayerAnimatedPaths);
  }

  /**
   * Sets cable feature and starts animation
   * @param cable cable feature
   */
  public setCableFeature(cable: AlloyCableFeature) {
    // clear any animations
    if (this.cableFeature) {
      this.animationManager.stopAnimation(this.cableFeature);
      this.clearConnectorLines();
    }

    // remove features from source and internal dictionary
    this.olSourceAnimatedPaths.clear(false);

    // start add the features to the dictionary and start the animation
    this.olSourceAnimatedPaths.addFeature(cable.olFeature);
    this.cableFeature = cable;
    this.animationManager.startAnimation(cable);
    this.addAllConnectorLines();
  }

  /**
   * Sets main feed feature for cable
   * @param feed main feed feature
   */
  public setMainFeed(feed: AlloyCableUnitFeature | null) {
    // first remove old main feed if available
    if (this.mainFeedFeature) {
      this.olSourcePathNodes.removeFeature(this.mainFeedFeature.olFeature);
      this.removeConnectorLine(this.mainFeedFeature);
    }

    // set new main feed
    this.mainFeedFeature = feed;
    if (this.mainFeedFeature) {
      this.olSourcePathNodes.addFeature(this.mainFeedFeature.olFeature);
      if (this.cableFeature) {
        this.addConnectorLine(this.mainFeedFeature, this.cableFeature);
      }
    }
  }

  /**
   * Sets sub feed feature for cable
   * @param feed sub feed feature
   */
  public setSubFeed(feed: AlloyCableUnitFeature | null) {
    // first remove old sub feed if available
    if (this.subFeedFeature) {
      this.olSourcePathNodes.removeFeature(this.subFeedFeature.olFeature);
      this.removeConnectorLine(this.subFeedFeature);
    }

    // set new sub feed
    this.subFeedFeature = feed;
    if (this.subFeedFeature) {
      this.olSourcePathNodes.addFeature(this.subFeedFeature.olFeature);
      if (this.cableFeature) {
        this.addConnectorLine(this.subFeedFeature, this.cableFeature);
      }
    }
  }

  /**
   * Sets connected unit features for cable
   * @param units array of connected unit features
   */
  public setConnectedUnits(units: AlloyCableUnitFeature[]) {
    // first remove all old connected units
    for (const unit of Array.from(this.connectedUnitsFeatures.values())) {
      this.olSourcePathNodes.removeFeature(unit.olFeature);
      this.removeConnectorLine(unit);
    }
    this.connectedUnitsFeatures.clear();

    // add new connected units
    units.forEach((unit) => {
      this.connectedUnitsFeatures.set(unit.id, unit);
      if (this.cableFeature) {
        this.addConnectorLine(unit, this.cableFeature);
      }
    });
    this.olSourcePathNodes.addFeatures(units.map((w) => w.olFeature));
  }

  /**
   * Clears the layer and stops cable animation
   */
  public clear() {
    // clear cable
    if (this.cableFeature) {
      this.animationManager.stopAnimation(this.cableFeature);
    }
    this.cableFeature = null;
    this.olSourceAnimatedPaths.clear(false);

    this.mainFeedFeature = null;
    this.subFeedFeature = null;
    this.connectedUnitsFeatures.clear();
    this.olSourcePathNodes.clear(false);

    this.clearConnectorLines();
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyFeature | null {
    if (this.cableFeature && this.cableFeature.id === id) {
      return this.cableFeature;
    }
    if (this.mainFeedFeature && this.mainFeedFeature.id === id) {
      return this.mainFeedFeature;
    }
    if (this.subFeedFeature && this.subFeedFeature.id === id) {
      return this.subFeedFeature;
    }
    return this.connectedUnitsFeatures.get(id) || super.getFeatureById(id);
  }

  /**
   * @implements
   */
  public clone(map: AlloyMap): AlloyCableLayer {
    const newOptions = Object.assign({}, this.options, { map });
    return new AlloyCableLayer(newOptions);
  }

  /**
   * @implements
   * @ignore
   * @internal
   */
  protected createStyleProcessor(): AlloyCableStyleProcessor {
    return new AlloyCableStyleProcessor(this);
  }

  /**
   * Adds connector lines for all feeds and connected units
   * @ignore
   * @internal
   */
  private addAllConnectorLines() {
    this.clearConnectorLines();
    if (!this.cableFeature) {
      return;
    }

    if (this.mainFeedFeature) {
      this.addConnectorLine(this.mainFeedFeature, this.cableFeature);
    }

    if (this.subFeedFeature) {
      this.addConnectorLine(this.subFeedFeature, this.cableFeature);
    }

    for (const connectedUnitFeature of Array.from(this.connectedUnitsFeatures.values())) {
      this.addConnectorLine(connectedUnitFeature, this.cableFeature);
    }
  }
}
