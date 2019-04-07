import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import { AlloyLayerZIndex } from '../core/AlloyLayerZIndex';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyStyleProcessor } from '../styles/AlloyStyleProcessor';
import { AlloyLayer } from './AlloyLayer';
import { AlloyStyleBuilderBuildState } from '../styles/AlloyStyleBuilderBuildState';

/**
 * base implementation for alloy layers with features
 * @template T the feature types the loader is expected to load
 * @ignore
 */
export abstract class AlloyLayerWithFeatures<T extends AlloyFeature> implements AlloyLayer {
  /**
   * debugger instance
   * @ignore
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
   */
  public readonly olLayer: OLVectorLayer;

  /**
   * the openlayers source containing features for this layer
   * @ignore
   */
  public readonly olSource: OLVectorSource = new OLVectorSource();

  /**
   * the features currently in the source for this layer
   * @ignore
   */
  protected readonly currentFeatures = new Map<string, T>();

  /**
   * the active style processor
   */
  private currentStyleProcessor: AlloyStyleProcessor | null = null;

  /**
   * creates a new instance
   * @param id the id of the layer
   * @param map the map the layer is a member of
   * @param zIndex the z-index of the layer
   */
  constructor(id: string, map: AlloyMap, zIndex: AlloyLayerZIndex) {
    // set the debugger instance
    this.debugger = map.debugger.extend(AlloyLayerWithFeatures.name + ':' + id);

    this.id = id;
    this.map = map;
    this.olLayer = new OLVectorLayer({
      // vector mode as it is more accurate for rendering, but maybe consider "image" in future?
      renderMode: 'vector',
      // set the styling for the layer, we use a fat arrow function here else "this" resolves wrong
      style: (olFeature, resolution) => {
        if (this.currentStyleProcessor) {
          return this.currentStyleProcessor.onStyleProcess(
            olFeature,
            resolution,
            AlloyStyleBuilderBuildState.Default,
          );
        } else {
          this.debugger('style processor called but not set');
          return null;
        }
      },
      source: this.olSource,
      zIndex,
    });
  }

  /**
   * @implements
   * @ignore
   */
  public get styleProcessor(): AlloyStyleProcessor | null {
    return this.currentStyleProcessor;
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): T | null {
    return this.currentFeatures.get(id) || null;
  }

  /**
   * gets the features in the layer
   */
  public get features(): Map<string, T> {
    return new Map(this.currentFeatures);
  }

  /**
   * adds a feature to the layer
   * @param feature the feature to add to the layer
   * @returns a flag indicating if the underlying sources were modified
   * @ignore
   */
  public addFeature(feature: T): boolean {
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
   * @returns a flag indicating if the underlying sources were modified
   * @ignore
   */
  public addFeatures(features: T[]): boolean {
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
        'adding features that are not already in layer: %o',
        featuresNotInLayer.map((f) => f.id),
      );
    }
    this.olSource.addFeatures(featuresNotInLayer.map((f) => f.olFeature));
    featuresNotInLayer.forEach((f) => this.currentFeatures.set(f.id, f));
    return true;
  }

  /**
   * clear all features from the layer
   * @returns a flag indicating if the underlying sources were modified
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

  /**
   * sets the style processor
   * @param processor the processor for styles
   */
  protected setStyleProcessor(processor: AlloyStyleProcessor) {
    this.currentStyleProcessor = processor;
  }
}