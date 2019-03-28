// tslint:disable
import { Context } from './Context';
import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
import { DodiAttributeType } from './DodiAttributeType';
/**
 * 
 * @export
 * @interface DodiAttributeWebModel
 */
export interface DodiAttributeWebModel {
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeWebModel
   */
  name: string;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeWebModel
   */
  code: string;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeWebModel
   */
  parent: string;
  /**
   * 
   * @type {Context}
   * @memberof DodiAttributeWebModel
   */
  context: Context;
  /**
   * 
   * @type {DodiAttributeType}
   * @memberof DodiAttributeWebModel
   */
  type: DodiAttributeType;
  /**
   * 
   * @type {boolean}
   * @memberof DodiAttributeWebModel
   */
  required: boolean;
  /**
   * 
   * @type {boolean}
   * @memberof DodiAttributeWebModel
   */
  readonly: boolean;
  /**
   * 
   * @type {boolean}
   * @memberof DodiAttributeWebModel
   */
  unique: boolean;
  /**
   * 
   * @type {Array<string>}
   * @memberof DodiAttributeWebModel
   */
  tags: Array<string>;
  /**
   * 
   * @type {DodiAttributeOptionsWebModelBase}
   * @memberof DodiAttributeWebModel
   */
  options: DodiAttributeOptionsWebModelBase;
}
