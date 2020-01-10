// tslint:disable
import { LayerStyleWebModel } from './LayerStyleWebModel';
import { LayerWebModel } from './LayerWebModel';
import { WmsLayerStyleWebModel } from './WmsLayerStyleWebModel';
/**
 * WMS Layer web model
 * @export
 * @interface WmsLayerWebModel
 */
export interface WmsLayerWebModel {
  /**
   * Layer title as shown to the Alloy user to identify the layer
   * @type {string}
   * @memberof WmsLayerWebModel
   */
  title: string;
  /**
   * Layer identifier used to identify the layer in the Web Map Service
   * @type {string}
   * @memberof WmsLayerWebModel
   */
  identifier: string;
  /**
   * Optional style override for the layer as an alternative to the default style
   * @type {WmsLayerStyleWebModel}
   * @memberof WmsLayerWebModel
   */
  style?: WmsLayerStyleWebModel;
  /**
   * Is the layer opaque
   * @type {boolean}
   * @memberof WmsLayerWebModel
   */
  opaque: boolean;
}
