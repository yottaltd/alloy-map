// tslint:disable
import { LayerStyleConfigWebModelBase } from './LayerStyleConfigWebModelBase';
/**
 * Web request model for a layer style create operation
 * @export
 * @interface LayerStyleCreateRequestWebModel
 */
export interface LayerStyleCreateRequestWebModel {
  /**
   * The name of the layer style
   * @type {string}
   * @memberof LayerStyleCreateRequestWebModel
   */
  name: string;
  /**
   * The colour of the layer style
   * @type {string}
   * @memberof LayerStyleCreateRequestWebModel
   */
  colour: string;
  /**
   * The icon of the layer style
   * @type {string}
   * @memberof LayerStyleCreateRequestWebModel
   */
  icon: string;
  /**
   * The layer style config, that can either be of AQS or WFS type. An AQS style will contain an AQS query while a WFS one will contain the information necessary to query a WFS service
   * @type {LayerStyleConfigWebModelBase}
   * @memberof LayerStyleCreateRequestWebModel
   */
  config: LayerStyleConfigWebModelBase;
  /**
   * The signature is used to ensure that the card being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same card
   * @type {string}
   * @memberof LayerStyleCreateRequestWebModel
   */
  signature: string;
}
