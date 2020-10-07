/* eslint-disable max-len */

import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
import { AlloyLayerZIndex } from '@/map/core/AlloyLayerZIndex';
import { AlloyMap } from '@/map/core/AlloyMap';
import { FeaturesAddedEvent } from '@/map/events/FeaturesAddedEvent';
import { FeaturesAddedEventHandler } from '@/map/events/FeaturesAddedEventHandler';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyLayer } from '@/map/layers/AlloyLayer';
import { AlloyStyleBuilderBuildState } from '@/map/styles/AlloyStyleBuilderBuildState';
import { AlloyStyleProcessor } from '@/map/styles/AlloyStyleProcessor';
import { AlloyGeometryCollectionFunctions } from '@/map/styles/utils/geometry-functions/AlloyGeometryCollectionFunctions';
import { AlloyMultiPolygonFunctions } from '@/map/styles/utils/geometry-functions/AlloyMultiPolygonFunctions';
import { AlloyPolygonFunctions } from '@/map/styles/utils/geometry-functions/AlloyPolygonFunctions';
import { FeatureUtils } from '@/utils/FeatureUtils';
import { FindFeaturesWithinResult } from '@/utils/models/FindFeaturesWithinResult';
import { Debugger } from 'debug';
import { Geometry } from 'geojson';
import OLFeature from 'ol/Feature';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPolygon from 'ol/geom/Polygon';
import OLVectorLayer from 'ol/layer/Vector';
import { ObjectEvent } from 'ol/Object';
import OLVectorSource from 'ol/source/Vector';
import { SimpleEventDispatcher } from 'ste-simple-events';

/* eslint-enable max-len */

/**
 * base implementation for alloy layers with features
 * @template T the feature types the loader is expected to load
 * @ignore
 */
export abstract class AlloyLayerWithFeatures<T extends AlloyFeature> implements AlloyLayer {
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
   * handler for feature geometry change, we create this once for performance reasons. A single
   * scoped arrow function here is passed to all geometry change handlers when we setup the
   * event handlers on the features.
   * @param e event object
   */
  private readonly onChangeGeometryHandler = (e: ObjectEvent) =>
    this.handleFeatureGeometryChange(e);

  /**
   * creates a new instance
   * @param id the id of the layer
   * @param map the map the layer is a member of
   * @param zIndex the z-index of the layer
   * @ignore
   * @internal
   */
  constructor(id: string, map: AlloyMap, zIndex: AlloyLayerZIndex) {
    // set the debugger instance
    this.debugger = map.debugger.extend(AlloyLayerWithFeatures.name + ':' + id);

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
            this.debugger('style processor called but not set');
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
      this.debugger('feature: %s already exists in layer', feature.id);
      return false;
    }

    this.debugger('adding feature: %s', feature.id);
    this.olSource.addFeature(feature.olFeature);
    this.currentFeatures.set(feature.id, feature);
    this.featuresAddedDispatcher.dispatch(new FeaturesAddedEvent(this, [feature]));
    feature.olFeature.on('change:geometry', this.onChangeGeometryHandler);
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
      this.debugger("feature: %s doesn't exists in layer", feature.id);
      return false;
    }

    this.debugger('removing feature: %s', feature.id);
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
      // behind guard because we are performing operations for a log
      if (this.debugger.enabled) {
        this.debugger(
          'all features already exist in layer: %o',
          features.map((f) => f.id),
        );
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
    this.featuresAddedDispatcher.dispatch(new FeaturesAddedEvent(this, featuresNotInLayer));
    features.forEach((feature) =>
      feature.olFeature.on('change:geometry', this.onChangeGeometryHandler),
    );
    return true;
  }

  /**
   * clear all features from the layer
   * @returns a flag indicating if the underlying sources were modified
   */
  public clearFeatures(): boolean {
    const hasFeatures = this.currentFeatures.size > 0;
    if (hasFeatures) {
      this.debugger('clearing features');
      this.olSource.refresh();
      this.currentFeatures.clear();
    } else {
      this.debugger('no features to clear');
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

  /**
   * handles feature geometry changes
   * @param e the geometry change event to respond to
   */
  private handleFeatureGeometryChange(e: ObjectEvent) {
    if (!(e.target instanceof OLFeature)) {
      throw new AlloyMapError(
        1601995459,
        'geometry changed for feature but target was not OLFeature',
      );
    }

    // get feature and geometry
    const feature = e.target;
    const geometry = feature.getGeometry();

    // check if we need to clear any caches
    let shouldClearStyles = false;
    if (geometry instanceof OLPolygon) {
      AlloyPolygonFunctions.removeFromPolygonCache(geometry);
      shouldClearStyles = true;
    } else if (geometry instanceof OLMultiPolygon) {
      AlloyMultiPolygonFunctions.removeFromPolygonCache(geometry);
      shouldClearStyles = true;
    } else if (geometry instanceof OLGeometryCollection) {
      AlloyGeometryCollectionFunctions.removeFromPolygonCache(geometry);
      shouldClearStyles = true;
    }

    // if we need to clear anything then clear the the style processor
    if (shouldClearStyles && this.styleProcessor) {
      this.styleProcessor.clear();
    }

    feature.changed();
  }
}
