import { AlloyLayerZIndex } from '../core/AlloyLayerZIndex';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyFeature } from '../features/AlloyFeature';
import { FeatureGuards } from '../guards/FeatureGuards';
import { AlloyLayerWithFeatures } from './AlloyLayerWithFeatures';

/**
 * base implementation for alloy layers with features with item ids, this will hook into the add,
 * remove, clear functions to create another lookup of item id to feature id
 * @template T the feature types the loader is expected to load
 * @ignore
 */
export abstract class AlloyLayerWithFeaturesWithItemId<
  T extends AlloyFeature
> extends AlloyLayerWithFeatures<T> {
  /**
   * a lookup of item ids to their feature id's
   * @ignore
   * @internal
   */
  private readonly featureIdsForItemIds = new Map<string, string>();

  /**
   * creates a new instance
   * @param id the id of the layer
   * @param map the map the layer is a member of
   * @param zIndex the z-index of the layer
   * @ignore
   * @internal
   */
  constructor(id: string, map: AlloyMap, zIndex: AlloyLayerZIndex) {
    super(id, map, zIndex);
  }

  /**
   * @override
   */
  public addFeature(feature: T): boolean {
    const result = super.addFeature(feature);
    // intercept and add feature to lookup
    if (FeatureGuards.isAlloyFeatureWithItemId(feature)) {
      this.featureIdsForItemIds.set(feature.itemId, feature.id);
    }
    return result;
  }

  /**
   * @override
   */
  public removeFeature(feature: T): boolean {
    const result = super.removeFeature(feature);
    // intercept and remove feature from lookup
    if (FeatureGuards.isAlloyFeatureWithItemId(feature)) {
      this.featureIdsForItemIds.delete(feature.itemId);
    }
    return result;
  }

  /**
   * @override
   */
  public addFeatures(features: T[]): boolean {
    const result = super.addFeatures(features);
    // intercept and remove all features from lookup
    features.forEach((f) => {
      if (FeatureGuards.isAlloyFeatureWithItemId(f)) {
        this.featureIdsForItemIds.delete(f.itemId);
      }
    });
    return result;
  }

  /**
   * @override
   */
  public clearFeatures(): boolean {
    const result = super.clearFeatures();
    // intercept and remove all features from lookup
    this.featureIdsForItemIds.clear();
    return result;
  }

  /**
   * gets a feature by it's item id property (if it has one)
   */
  public getFeatureByItemId(itemId: string): T | null {
    const id = this.featureIdsForItemIds.get(itemId);
    if (id !== undefined) {
      return this.getFeatureById(id);
    }
    return null;
  }
}
