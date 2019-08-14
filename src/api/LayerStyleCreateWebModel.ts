// tslint:disable
import { LayerStyleConfigWebModelBase } from './LayerStyleConfigWebModelBase';
/**
 * Web model for a layer style edit operation
 * @export
 * @interface LayerStyleCreateWebModel
 */
export interface LayerStyleCreateWebModel {
  /**
   * The name of the layer style
   * @type {string}
   * @memberof LayerStyleCreateWebModel
   */
  name: string;
  /**
   * The colour of the layer style
   * @type {string}
   * @memberof LayerStyleCreateWebModel
   */
  colour: string;
  /**
   * The icon of the layer style
   * @type {string}
   * @memberof LayerStyleCreateWebModel
   */
  icon: string;
  /**
   * The layer style config, that can either be of AQS or WFS type. An AQS style will contain an AQS query while a WFS one will contain the information necessary to query a WFS service
   * @type {LayerStyleConfigWebModelBase}
   * @memberof LayerStyleCreateWebModel
   */
  config: LayerStyleConfigWebModelBase;
}
