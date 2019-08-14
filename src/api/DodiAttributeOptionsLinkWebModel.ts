// tslint:disable
import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsLinkWebModel
 */
export interface DodiAttributeOptionsLinkWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsLinkWebModel
   */
  code: string;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsLinkWebModel
   */
  graph: string;
  /**
   * 
   * @type {boolean}
   * @memberof DodiAttributeOptionsLinkWebModel
   */
  weakReference: boolean;
  /**
   * 
   * @type {number}
   * @memberof DodiAttributeOptionsLinkWebModel
   */
  max?: number;
  /**
   * 
   * @type {Array<string>}
   * @memberof DodiAttributeOptionsLinkWebModel
   */
  defaultValue?: Array<string>;
}
