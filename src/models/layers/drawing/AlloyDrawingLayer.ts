import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import * as uuid from 'uuid';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyLayer } from '../AlloyLayer';
import { AlloyDrawingLayerOptions } from './AlloyDrawingLayerOptions';
import { AlloyDrawingStyleProcessor } from './AlloyDrawingStyleProcessor';

/**
 * an alloy drawing layer for rendering features provided externally on the map
 */
export class AlloyDrawingLayer implements AlloyLayer {
  /**
   * debugger instance
   * @ignore
   */
  public readonly debugger: Debugger;

  /**
   * @implements
   */
  public readonly id: string = uuid.v1();

  /**
   * @implements
   */
  public readonly map: AlloyMap;

  /**
   * the openlayers layer to render on
   * @implements
   * @ignore
   */
  public readonly olLayer: OLVectorLayer;

  /**
   * the openlayers source containing features for this layer
   * @ignore
   */
  public readonly olSource: OLVectorSource;

  /**
   * the features currently in the source for this layer
   */
  private readonly features = new Map<string, AlloyFeature>();

  /**
   * the processor for styles on the layer
   */
  private readonly styleProcessor: AlloyDrawingStyleProcessor;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyDrawingLayerOptions) {
    this.map = options.map;

    // set the debugger instance
    this.debugger = this.map.debugger.extend(AlloyDrawingLayer.name);

    // initialised here because style processor need some of the above internal properties
    this.styleProcessor = new AlloyDrawingStyleProcessor(this);

    // create a new source to hold map features
    this.olSource = new OLVectorSource();

    // create a new vector layer instance to render our features
    this.olLayer = new OLVectorLayer({
      // vector mode as it is more accurate for rendering, but maybe consider "image" in future?
      renderMode: 'vector',
      // set the styling for the layer, we use a fat arrow function here else "this" resolves wrong
      style: (feature, resolution) => this.styleProcessor.onStyleProcess(feature, resolution),
      source: this.olSource,
      zIndex: 2,
    });
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyFeature | null {
    return this.features.get(id) || null;
  }

  /**
   * adds a feature to the layer
   * @param feature the feature to add to the layer
   */
  public addFeature(feature: AlloyFeature) {
    if (this.features.has(feature.id)) {
      return; // no-op
    }

    this.olSource.addFeature(feature.olFeature);
    this.features.set(feature.id, feature);
  }

  /**
   * adds several features at once to the layer, should be used instead of adding features
   * individually where possible
   * @param features the features to add to the layer
   */
  public addFeatures(features: AlloyFeature[]) {
    const featuresNotInLayer = features.filter((f) => !this.features.has(f.id));
    if (featuresNotInLayer.length === 0) {
      return; // no-op
    }

    this.olSource.addFeatures(featuresNotInLayer.map((f) => f.olFeature));
    featuresNotInLayer.forEach((f) => this.features.set(f.id, f));
  }

  public removeFeature(feature: AlloyFeature) {
    if (this.features.has(feature.id)) {
      return; // no-op
    }

    this.olSource.removeFeature(feature.olFeature);
    this.features.delete(feature.id);
  }

  /**
   * clear all features from the layer
   */
  public clearFeatures() {
    this.olSource.clear(true /* fast option doesn't dispatch removeFeature events */);
    this.features.clear();
  }
}
