import { WfsFeatureDescription } from './WfsFeatureDescription';

/**
 * the properties of an external WFS feature
 */
export interface WfsFeatureProperty {
  /**
   * name of the WFS property
   */
  name: string;
  /**
   * WFS feature property value
   */
  value?: any;
  /**
   * Description of WFS feature property if available
   */
  description?: WfsFeatureDescription;
}
