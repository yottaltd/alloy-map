import { WmsStyleLegend } from '@/wms/WmsStyleLegend';

/**
 * wms layer style object describing the layer style from a wms service
 */
export interface WmsStyle {
  /**
   * WMS Name of the style
   */
  readonly Name: string;

  /**
   * Human readable title of the style
   */
  readonly Title?: string;

  /**
   * Image legends associated with this style
   */
  readonly LegendURL?: WmsStyleLegend[];
}
