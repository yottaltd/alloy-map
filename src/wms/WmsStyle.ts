import { WmsStyleLegend } from './WmsStyleLegend';

/**
 * Parsed WMS Capabilties layer style
 */
export interface WmsStyle {
  /**
   * WMS Name of the style
   */
  Name: string;
  /**
   * Human readable title of the style
   */
  Title?: string;
  /**
   * Image legends associated with this style
   */
  LegendURL?: WmsStyleLegend[];
}
