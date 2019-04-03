/**
 * the properties returned from the service for an alloy item feature
 */
export interface AlloyItemFeatureProperties {
  /**
   * the design code the item belongs to
   */
  readonly designCode: string;

  /**
   * the item id of the feature
   */
  readonly itemId: string;

  /**
   * the colour to represent the item
   */
  readonly colour?: string;

  /**
   * the icon of the item
   */
  readonly icon?: string;

  /**
   * the title of the item
   */
  readonly title: string;

  /**
   * the subtitle of the item
   */
  readonly subtitle: string;

  /**
   * its stringified type
   */
  readonly type: string;

  /**
   * the style id that includes the item
   */
  readonly styleId: string;
}
