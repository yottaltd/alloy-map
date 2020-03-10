import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyLayer } from '../layers/AlloyLayer';

/**
 * Event for the layer feature loading
 */
export class FeatureLoaderEvent {
  /**
   * last loaded features
   */
  private readonly loadedFeatures: AlloyFeature[];

  /**
   * the layer that triggered the event
   */
  public layer: AlloyLayer;

  /**
   * creates a new event instance
   * @ignore
   * @internal
   */
  constructor(layer: AlloyLayer, features: AlloyFeature[]) {
    this.layer = layer;
    this.loadedFeatures = features;
  }

  /**
   * @return array of loaded features
   */
  public get features(): AlloyFeature[] {
    return this.loadedFeatures.slice();
  }
}
