import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyLayer } from '../layers/AlloyLayer';

/**
 * Event for the layer features added
 */
export class FeaturesAddedEvent {
  /**
   * last added features
   */
  private readonly addedFeatures: AlloyFeature[];

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
    this.addedFeatures = features;
  }

  /**
   * @return array of added features
   */
  public get features(): AlloyFeature[] {
    return this.addedFeatures.slice();
  }
}
