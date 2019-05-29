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
  readonly icon?: string;

  /**
   * text to display instead of icon, the icon must not be set
   */
  readonly text?: string;

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
   * whether the feature allows hover or not
   */
  readonly allowsHover?: boolean;

  /**
   * whether the feature scales based on zoom level, if set to false it is always the fixed max size
   */
  readonly scale?: boolean;
}
