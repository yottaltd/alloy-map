/**
 * Description for WFS feature parameter
 */
export interface WfsFeatureDescription {
  /**
   * name of WFS feature property
   */
  name: string;
  /**
   * Whether property is nullable
   */
  nillable: boolean;
  /**
   * Minimum number of value occurences
   */
  minOccurs: number;
  /**
   * Maxmimum number of value occurences
   */
  maxOccurs: number;
  /**
   * value type of feature property
   */
  type: string;
}
