import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
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
  public readonly id: string = AlloySelectionLayer.name;

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
   * @ignore
   */
  public addFeature(feature: AlloyFeature): boolean {
    // check to see if we already have the feature
    if (this.currentFeatures.has(feature.id)) {
      this.debugger('feature: %s already exists in layer', feature.id);
      return false;
    }

    this.debugger('adding feature: %s', feature.id);
    this.olSource.addFeature(feature.olFeature);
    this.currentFeatures.set(feature.id, feature);
    return true;
  }

  /**
   * adds several features at once to the layer, should be used instead of adding features
   * individually where possible
   * @param features the features to add to the layer
   * @returns a flag indicating if the features were selected (false if they're already selected)
   * @ignore
   */
  public addFeatures(features: AlloyFeature[]): boolean {
    const featuresNotInLayer = features.filter((f) => !this.currentFeatures.has(f.id));
    if (featuresNotInLayer.length === 0) {
      // behind guard because we are performing operations for a log
      if (this.debugger.enabled) {
        this.debugger('all features already exist in layer: %o', features.map((f) => f.id));
      }
      return false; // no-op
    }

    // behind guard because we are performing operations for a log
    if (this.debugger.enabled) {
      this.debugger(
        'selecting features that are not already selected: %o',
        featuresNotInLayer.map((f) => f.id),
      );
    }
    this.olSource.addFeatures(featuresNotInLayer.map((f) => f.olFeature));
    featuresNotInLayer.forEach((f) => this.currentFeatures.set(f.id, f));
    return true;
  }

  /**
   * clear all features from the layer
   * @returns flag indicating if any features were removed
   * @ignore
   */
  public clearFeatures(): boolean {
    const hasFeatures = this.currentFeatures.size > 0;
    if (hasFeatures) {
      this.debugger('clearing features');
      this.olSource.clear(true /* fast option doesn't dispatch removeFeature events */);
      this.currentFeatures.clear();
    } else {
      this.debugger('no features to clear');
    }
    return hasFeatures;
  }
}
