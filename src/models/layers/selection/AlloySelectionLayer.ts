import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import * as uuid from 'uuid';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyLayer } from '../AlloyLayer';
import { AlloySelectionLayerOptions } from './AlloySelectionLayerOptions';
import { AlloySelectionStyleProcessor } from './AlloySelectionStyleProcessor';

/**
 * a special interaction layer for selected features
 * @ignore
 */
export class AlloySelectionLayer implements AlloyLayer {
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
   * @override
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
  private readonly currentFeatures = new Map<string, AlloyFeature>();

  /**
   * the processor for styles on the layer
   */
  private readonly styleProcessor: AlloySelectionStyleProcessor;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloySelectionLayerOptions) {
    this.map = options.map;

    // set the debugger instance
    this.debugger = this.map.debugger.extend(AlloySelectionLayer.name);

    // initialised here because style processor need some of the above internal properties
    this.styleProcessor = new AlloySelectionStyleProcessor(this);

    // create a new source to hold map features
    this.olSource = new OLVectorSource();

    // create a new vector layer instance to render our features
    this.olLayer = new OLVectorLayer({
      // vector mode as it is more accurate for rendering, but maybe consider "image" in future?
      renderMode: 'vector',
      // set the styling for the layer, we use a fat arrow function here else "this" resolves wrong
      style: (feature, resolution) => this.styleProcessor.onStyleProcess(feature, resolution),
      source: this.olSource,
      zIndex: 4,
    });
  }

  /**
   * gets the features in the selection layer
   */
  public get features(): Map<string, AlloyFeature> {
    return new Map(this.currentFeatures);
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyFeature | null {
    return this.currentFeatures.get(id) || null;
  }

  /**
   * adds a feature to the layer
   * @param feature the feature to add to the layer
   * @returns a flag indicating if the feature was selected (false if its already selected)
   */
  public addFeature(feature: AlloyFeature): boolean {
    // check to see if we already have the feature
    if (this.currentFeatures.has(feature.id)) {
      return false;
    }

    this.olSource.addFeature(feature.olFeature);
    this.currentFeatures.set(feature.id, feature);
    return true;
  }

  /**
   * adds several features at once to the layer, should be used instead of adding features
   * individually where possible
   * @param features the features to add to the layer
   * @returns a flag indicating if the features were selected (false if they're already selected)
   */
  public addFeatures(features: AlloyFeature[]): boolean {
    const featuresNotInLayer = features.filter((f) => !this.features.has(f.id));
    if (featuresNotInLayer.length === 0) {
      return false; // no-op
    }

    this.olSource.addFeatures(featuresNotInLayer.map((f) => f.olFeature));
    featuresNotInLayer.forEach((f) => this.features.set(f.id, f));
    return true;
  }

  /**
   * clear all features from the layer
   * @returns flag indicating if any features were removed
   */
  public clearFeatures(): boolean {
    const hasFeatures = this.features.size > 0;
    if (hasFeatures) {
      this.olSource.clear(true /* fast option doesn't dispatch removeFeature events */);
      this.currentFeatures.clear();
    }
    return hasFeatures;
  }
}
