import { AlloyFeature } from '../features/AlloyFeature';

/**
 * event fired when there is a selection event and there are features obscured or underneath the
 * pixel coordinate selected, this allows the ui to respond and suggest them as alternatives
 * @event
 */
export class FeaturesUnderSelectionEvent {
  /**
   * the feature that was selected as a result of the event
   */
  public selectedFeature: AlloyFeature;

  /**
   * the features that were underneath the selected feature and thus not selected
   */
  private originalStack: Map<string, AlloyFeature>;

  /**
   * creates a new event instance
   * @param selectedFeature the feature selected that is on top of all the others
   * @param stack the features underneath the selected feature
   */
  constructor(selectedFeature: AlloyFeature, stack: Map<string, AlloyFeature>) {
    this.selectedFeature = selectedFeature;
    this.originalStack = stack;
  }

  /**
   * gets the features under the selected feature
   */
  public get stack(): Map<string, AlloyFeature> {
    return new Map(this.originalStack);
  }
}
