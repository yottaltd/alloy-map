import { AlloyFeature } from '../features/AlloyFeature';

/**
 * event fired when there is a change in selected features
 * @event
 */
export class FeatureSelectionChangeEvent {
  /**
   * the features currently selected
   * @ignore
   * @internal
   */
  private afterSelection: Map<string, AlloyFeature>;

  /**
   * the features that were previously selected
   * @ignore
   * @internal
   */
  private beforeSelection: Map<string, AlloyFeature>;

  /**
   * creates a new event instance
   * @param features the features currently selected
   * @param oldFeatures the features that were previously selected
   * @ignore
   * @internal
   */
  constructor(features: Map<string, AlloyFeature>, oldFeatures: Map<string, AlloyFeature>) {
    this.afterSelection = features;
    this.beforeSelection = oldFeatures;
  }

  /**
   * gets the features currently selected
   */
  public get features(): Map<string, AlloyFeature> {
    return new Map(this.afterSelection);
  }

  /**
   * gets the features that were previously selected
   */
  public get oldFeatures(): Map<string, AlloyFeature> {
    return new Map(this.beforeSelection);
  }
}
