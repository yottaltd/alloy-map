// tslint:disable
import { JObject } from './JObject';
/**
 * 
 * @export
 * @interface DodiStencilControlWebModel
 */
export interface DodiStencilControlWebModel {
  /**
   * 
   * @type {string}
   * @memberof DodiStencilControlWebModel
   */
  code: string;
  /**
   * 
   * @type {JObject}
   * @memberof DodiStencilControlWebModel
   */
  properties: JObject;
  /**
   * 
   * @type {boolean}
   * @memberof DodiStencilControlWebModel
   */
  hidden: boolean;
  /**
   * 
   * @type {string}
   * @memberof DodiStencilControlWebModel
   */
  attributeCode?: string;
}
