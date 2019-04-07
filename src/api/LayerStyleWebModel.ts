// tslint:disable
import { Exception } from './Exception';
import { LayerStyleConfigWebModelBase } from './LayerStyleConfigWebModelBase';
import { LayerStyleType } from './LayerStyleType';
import { LayerStyleValidity } from './LayerStyleValidity';
import { AlloyException } from './AlloyException';
/**
 * Web model for a layer style
 * @export
 * @interface LayerStyleWebModel
 */
export interface LayerStyleWebModel {
  /**
   * The layer style AId
   * @type {string}
   * @memberof LayerStyleWebModel
   */
  id: string;
  /**
   * The layer style name
   * @type {string}
   * @memberof LayerStyleWebModel
   */
  name: string;
  /**
   * The layer style type
   * @type {LayerStyleType}
   * @memberof LayerStyleWebModel
   */
  type: LayerStyleType;
  /**
   * The layer style colour
   * @type {string}
   * @memberof LayerStyleWebModel
   */
  colour?: string;
  /**
   * The layer style icon
   * @type {string}
   * @memberof LayerStyleWebModel
   */
  icon?: string;
  /**
   * The layer style config object containing different information depending on the layer type
   * @type {LayerStyleConfigWebModelBase}
   * @memberof LayerStyleWebModel
   */
  config: LayerStyleConfigWebModelBase;
  /**
   * It gives an indication of the style validity. If invalid, it tells whether it is a case it is possible recover from or not
   * @type {LayerStyleValidity}
   * @memberof LayerStyleWebModel
   */
  validity: LayerStyleValidity;
  /**
   * If the style is invalid, it explains what error made it invalid
   * @type {AlloyException}
   * @memberof LayerStyleWebModel
   */
  error?: AlloyException;
}
