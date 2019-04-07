import { AlloyFeature } from '../features/AlloyFeature';

/**
 * event fired when there is a change in selected features
 * @event
 */
export class FeatureSelectionChangeEvent {
  /**
   * the features currently selected
   */
  private originalFeatures: Map<string, AlloyFeature>;

  /**
   * creates a new event instance
   * @param features the features currently selected
   */
  constructor(features: Map<string, AlloyFeature>) {
    this.originalFeatures = features;
  }

  /**
   * gets the features currently selected
   */
  public get features(): Map<string, AlloyFeature> {
    return new Map(this.originalFeatures);
  }
}
