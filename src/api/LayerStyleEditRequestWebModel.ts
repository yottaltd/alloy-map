// tslint:disable
import { LayerStyleConfigWebModelBase } from './LayerStyleConfigWebModelBase';
/**
 * Web request model for a layer style edit operation
 * @export
 * @interface LayerStyleEditRequestWebModel
 */
export interface LayerStyleEditRequestWebModel {
  /**
   * The name of the layer style
   * @type {string}
   * @memberof LayerStyleEditRequestWebModel
   */
  name: string;
  /**
   * The colour of the layer style
   * @type {string}
   * @memberof LayerStyleEditRequestWebModel
   */
  colour: string;
  /**
   * The icon of the layer style
   * @type {string}
   * @memberof LayerStyleEditRequestWebModel
   */
  icon: string;
  /**
   * The layer style config, that can either be of AQS or WFS type. An AQS style will contain an AQS query while a WFS one will contain the information necessary to query a WFS service
   * @type {LayerStyleConfigWebModelBase}
   * @memberof LayerStyleEditRequestWebModel
   */
  config: LayerStyleConfigWebModelBase;
  /**
   * The signature is used to ensure that the card being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same card
   * @type {string}
   * @memberof LayerStyleEditRequestWebModel
   */
  signature: string;
}
