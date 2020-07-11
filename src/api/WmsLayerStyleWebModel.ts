import { LayerStyleWebModel } from './LayerStyleWebModel';
import { WmsLayerStyleLegendWebModel } from './WmsLayerStyleLegendWebModel';
/**
 * WMS Layer Style web model
 * @export
 * @interface WmsLayerStyleWebModel
 */
export interface WmsLayerStyleWebModel {
  /**
   * Style title as shown to the Alloy user to identify the style
   * @type {string}
   * @memberof WmsLayerStyleWebModel
   */
  title: string;
  /**
   * Style identifier used to identify the style in the Web Map Service
   * @type {string}
   * @memberof WmsLayerStyleWebModel
   */
  identifier: string;
  /**
   * Style Legends
   * @type {Array<WmsLayerStyleLegendWebModel>}
   * @memberof WmsLayerStyleWebModel
   */
  legends: Array<WmsLayerStyleLegendWebModel>;
}
