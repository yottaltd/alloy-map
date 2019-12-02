import { WmtsStyleLegend } from './WmtsStyleLegend';

/**
 * wmts layer style object describing the layer style from a wmts service
 */
export interface WmtsStyle {
  /**
   * WMTS Name of the style
   */
  readonly Identifier: string;

  /**
   * Human readable title of the style
   */
  readonly Title: string;

  /**
   * Image legends associated with this style
   */
  readonly LegendURL?: WmtsStyleLegend;

  /**
   * Whether the style is used as a default one for the layer
   */
  readonly isDefault?: boolean;
}
