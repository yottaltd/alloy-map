import { Debugger } from 'debug';
import OLFeature from 'ol/Feature';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { AlloyLayerZIndex } from '../core/AlloyLayerZIndex';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyFeatureWithItemId } from '../features/AlloyFeatureWithItemId';
import { AlloyLayerWithFeatures } from './AlloyLayerWithFeatures';

/**
 * base implementation for alloy layers with features with item ids
 * @template T the feature types the loader is expected to load
 * @ignore
 */
export abstract class AlloyLayerWithFeaturesWithItemIds<
  T extends AlloyFeatureWithItemId
> extends AlloyLayerWithFeatures<T> {
  /**
   * debugger instance
   * @ignore
   * @internal
   */
  public readonly debugger: Debugger;

  protected readonly featureIdsForItemIds = new Map<string, string>();

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
    // set the debugger instance
    this.debugger = map.debugger.extend(AlloyLayerWithFeaturesWithItemIds.name + ':' + id);

    this.olSource.on('addfeature', (event: any) => {
      const olFeature: OLFeature = event.feature;
      const featureId = FeatureUtils.getFeatureIdFromOlFeature(olFeature);
      const feature = this.currentFeatures.get(featureId);
      if (feature) {
        const itemId = feature.getItemId();
        if (itemId !== null) {
          this.featureIdsForItemIds.set(itemId, featureId);
        }
      } else {
        this.debugger('feature not found on add callback');
      }
    });
    this.olSource.on('removefeature', (event: any) => {
      const olFeature: OLFeature = event.feature;
      const featureId = FeatureUtils.getFeatureIdFromOlFeature(olFeature);
      const feature = this.currentFeatures.get(featureId);
      if (feature) {
        const itemId = feature.getItemId();
        if (itemId !== null) {
          this.featureIdsForItemIds.delete(itemId);
        }
      } else {
        this.debugger('feature not found on remove callback');
      }
    });
  }

  /**
   * Gets feature by itemId property
   */
  public getFeatureByItemId(itemId: string): T | null {
    const id = this.featureIdsForItemIds.get(itemId);
    if (id !== undefined) {
      return this.getFeatureById(id);
    }
    return null;
  }
}
