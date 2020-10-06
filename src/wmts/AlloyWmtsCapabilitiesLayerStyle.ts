// eslint-disable-next-line max-len
import { AlloyWmtsCapabilitiesLayerStyleLegend } from '@/wmts/AlloyWmtsCapabilitiesLayerStyleLegend';

/**
 * WMTS Capabilties layer style parameters
 */
export interface AlloyWmtsCapabilitiesLayerStyle {
  /**
   * Title of the layer style (displayed to user)
   */
  title?: string;
  /**
   * Identifier for layer request
   */
  identifier: string;
  /**
   * Style legend
   */
  legend?: AlloyWmtsCapabilitiesLayerStyleLegend;
  /**
   * Whether style is a default one for layer
   */
  isDefault: boolean;
}
