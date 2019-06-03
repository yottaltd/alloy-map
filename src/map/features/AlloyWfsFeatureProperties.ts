/**
 * the properties for an alloy wfs feature
 */
export interface AlloyWfsFeatureProperties {
  /**
   * the colour to represent the feature
   */
  readonly colour: string;

  /**
   * the icon of the feature
   */
  readonly icon: string;

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
