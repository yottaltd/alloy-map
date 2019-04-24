/**
 * the properties for an alloy custom feature
 */
export interface AlloyCustomFeatureProperties {
  /**
   * the colour to represent the feature
   */
  readonly colour: string;

  /**
   * the icon of the feature
   */
  readonly icon: string;

  /**
   * the title of the feature
   */
  readonly title: string;

  /**
   * the subtitle of the feature
   */
  readonly subtitle: string;

  /**
   * whether the feature allows selection or not
   */
  readonly allowsSelection?: boolean;

  /**
   * whether the feature scales based on zoom level, if set to false it is always the fixed max size
   */
  readonly scale?: boolean;
}
