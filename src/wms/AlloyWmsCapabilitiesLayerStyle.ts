import { AlloyWmsCapabilitiesLayerStyleLegend } from '@/wms/AlloyWmsCapabilitiesLayerStyleLegend';

/**
 * WMS Capabilties layer style parameters
 */
export interface AlloyWmsCapabilitiesLayerStyle {
  /**
   * Title of the layer style (displayed to user)
   */
  title: string;
  /**
   * Name for layer request
   */
  name: string;

  /**
   * Style legends
   */
  legends: AlloyWmsCapabilitiesLayerStyleLegend[];
}
