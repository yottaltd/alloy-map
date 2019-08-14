// tslint:disable
import { LayerStyleConfigWebModelBase } from './LayerStyleConfigWebModelBase';
/**
 * Web  model for a layer style edit operation
 * @export
 * @interface LayerStyleEditWebModel
 */
export interface LayerStyleEditWebModel {
  /**
   * The existing layer style AId, leave empty for new layer style
   * @type {string}
   * @memberof LayerStyleEditWebModel
   */
  id?: string;
  /**
   * The name of the layer style
   * @type {string}
   * @memberof LayerStyleEditWebModel
   */
  name: string;
  /**
   * The colour of the layer style
   * @type {string}
   * @memberof LayerStyleEditWebModel
   */
  colour: string;
  /**
   * The icon of the layer style
   * @type {string}
   * @memberof LayerStyleEditWebModel
   */
  icon: string;
  /**
   * The layer style config, that can either be of AQS or WFS type. An AQS style will contain an AQS query while a WFS one will contain the information necessary to query a WFS service
   * @type {LayerStyleConfigWebModelBase}
   * @memberof LayerStyleEditWebModel
   */
  config: LayerStyleConfigWebModelBase;
}
