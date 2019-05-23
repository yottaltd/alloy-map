/**
 * the properties for an alloy draw feature
 */
export interface AlloyDrawFeatureProperties {
  /**
   * the colour to represent the feature
   */
  readonly colour: string;

  /**
   * the icon of the feature
   */
  readonly icon: string;

  /**
   * the layer id that the item originated from
   */
  readonly originatingLayerId?: string;
}
