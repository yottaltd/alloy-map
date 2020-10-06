import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
import { AlloyLayerZIndex } from '@/map/core/AlloyLayerZIndex';
import { AlloyMap } from '@/map/core/AlloyMap';
import { FeaturesAddedEvent } from '@/map/events/FeaturesAddedEvent';
import { FeaturesAddedEventHandler } from '@/map/events/FeaturesAddedEventHandler';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyLayer } from '@/map/layers/AlloyLayer';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '@/map/styles/AlloyStyleProcessor';
import { FeatureUtils } from '@/utils/FeatureUtils';
import { FindFeaturesWithinResult } from '@/utils/models/FindFeaturesWithinResult';
import { Geometry } from 'geojson';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import { SimpleEventDispatcher } from 'ste-simple-events';

/**
 * base implementation for alloy layers with features
 * @template T the feature types the loader is expected to load
 * @ignore
 */
export abstract class AlloyLayerWithFeatures<T extends AlloyFeature> implements AlloyLayer {
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
  public readonly olLayers: OLVectorLayer[];

  /**
   * the openlayers source containing features for this layer
   * @ignore
   * @internal
   */
  public readonly olSource: OLVectorSource = new OLVectorSource();

  /**
   * the features currently in the source for this layer
   * @ignore
   * @internal
   */
  protected readonly currentFeatures = new Map<string, T>();

  /**
   * the active style processor
   */
  private currentStyleProcessor: AlloyStyleProcessor | null = null;

  /**
   * event dispatcher for added features
   */
  private readonly featuresAddedDispatcher = new SimpleEventDispatcher<FeaturesAddedEvent>();

  /**
   * creates a new instance
   * @param id the id of the layer
   * @param map the map the layer is a member of
   * @param zIndex the z-index of the layer
   * @ignore
   * @internal
   */
  constructor(id: string, map: AlloyMap, zIndex: AlloyLayerZIndex) {
    this.id = id;
    this.map = map;
    this.olLayers = [
      new OLVectorLayer({
        // set the style for the layer, we use a fat arrow function here else "this" resolves wrong
        style: (olFeature, resolution) => {
          if (this.currentStyleProcessor) {
            return this.currentStyleProcessor.onStyleProcess(
              olFeature,
              resolution,
              AlloyStyleBuilderBuildState.Default,
            );
          } else {
            return [];
          }
        },
        source: this.olSource,
        zIndex,
      }),
    ];
  }

  /**
   * @implements
   * @ignore
   * @internal
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
   */
  public addFeature(feature: T): boolean {
    // check to see if we already have the feature
    if (this.currentFeatures.has(feature.id)) {
      return false;
    }

    this.olSource.addFeature(feature.olFeature);
    this.currentFeatures.set(feature.id, feature);
    this.featuresAddedDispatcher.dispatch(new FeaturesAddedEvent(this, [feature]));
    return true;
  }

  /**
   * removes a feature from the layer
   * @param feature the feature to remove from the layer
   * @returns a flag indicating if the underlying sources were modified
   */
  public removeFeature(feature: T): boolean {
    // check to see if we already have the feature
    if (!this.currentFeatures.has(feature.id)) {
      return false;
    }

    this.olSource.removeFeature(feature.olFeature);
    this.currentFeatures.delete(feature.id);
    return true;
  }

  /**
   * adds several features at once to the layer, should be used instead of adding features
   * individually where possible
   * @param features the features to add to the layer
   * @returns a flag indicating if the underlying sources were modified
   */
  public addFeatures(features: T[]): boolean {
    const featuresNotInLayer = features.filter((f) => !this.currentFeatures.has(f.id));
    if (featuresNotInLayer.length === 0) {
      return false; // no-op
    }

    this.olSource.addFeatures(featuresNotInLayer.map((f) => f.olFeature));
    featuresNotInLayer.forEach((f) => this.currentFeatures.set(f.id, f));
    this.featuresAddedDispatcher.dispatch(new FeaturesAddedEvent(this, featuresNotInLayer));
    return true;
  }

  /**
   * clear all features from the layer
   * @returns a flag indicating if the underlying sources were modified
   */
  public clearFeatures(): boolean {
    const hasFeatures = this.currentFeatures.size > 0;
    if (hasFeatures) {
      this.olSource.refresh();
      this.currentFeatures.clear();
    }
    return hasFeatures;
  }

  /**
   * @implements
   */
  public abstract dispose(): void;

  /**
   * finds features close to provided source
   * @param source `AlloyCoordinate`, `AlloyFeature` or `Geometry` source to measure distance of
   * features from
   * @param delta distance (in metres) from source for which to return features
   * @returns an array of results ordered by closest first
   */
  public findFeaturesWithin(
    source: AlloyCoordinate | AlloyFeature | Geometry,
    delta: number,
  ): FindFeaturesWithinResult[] {
    return FeatureUtils.findFeaturesWithin([this], source, delta);
  }

  /**
   * sets the style processor
   * @param processor the processor for styles
   * @ignore
   * @internal
   */
  protected setStyleProcessor(processor: AlloyStyleProcessor) {
    this.currentStyleProcessor = processor;
  }

  /**
   * adds a handler to listen for the features added to layer
   * @param handler the handler to call when features have been added
   */
  public addFeaturesAddedListener(handler: FeaturesAddedEventHandler) {
    this.featuresAddedDispatcher.subscribe(handler);
  }

  /**
   * removes a handler listening to the features added to layer
   * @param handler the handler to stop listening
   */
  public removeFeaturesAddedListener(handler: FeaturesAddedEventHandler) {
    this.featuresAddedDispatcher.unsubscribe(handler);
  }
}
