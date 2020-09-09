import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyLayer } from './AlloyLayer';

/**
 * an alloy layer with features can be drawn on top of the map to render features
 */
export interface AlloyFeaturesLayer<T extends AlloyFeature> extends AlloyLayer {
  /**
   * the features currently in the source for this layer
   * @implements
   * @ignore
   * @internal
   */
  readonly currentFeatures: Map<string, T>;

  /**
   * adds a feature to the layer
   * @param feature the feature to add to the layer
   * @returns a flag indicating if the underlying sources were modified
   */

  addFeature(feature: T): boolean;

  /**
   * removes a feature from the layer
   * @param feature the feature to remove from the layer
   * @returns a flag indicating if the underlying sources were modified
   */
  removeFeature(feature: T): boolean;

  /**
   * adds several features at once to the layer, should be used instead of adding features
   * individually where possible
   * @param features the features to add to the layer
   * @returns a flag indicating if the underlying sources were modified
   */
  addFeatures(features: T[]): boolean;

  /**
   * clear all features from the layer
   * @returns a flag indicating if the underlying sources were modified
   */
  clearFeatures(): boolean;
}
