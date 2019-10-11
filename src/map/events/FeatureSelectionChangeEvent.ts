import { AlloyFeature } from '../features/AlloyFeature';

/**
 * event fired when there is a change in selected features
 * @event
 */
export class FeatureSelectionChangeEvent {
  /**
   * determines if the event was triggered programatically or by a user event e.g. mouse click
   */
  public readonly userEvent: boolean;

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
   * @param userEvent whether the event is triggered by the user interaction
   * @ignore
   * @internal
   */
  constructor(
    features: Map<string, AlloyFeature>,
    oldFeatures: Map<string, AlloyFeature>,
    userEvent: boolean,
  ) {
    this.afterSelection = features;
    this.beforeSelection = oldFeatures;
    this.userEvent = userEvent;
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
