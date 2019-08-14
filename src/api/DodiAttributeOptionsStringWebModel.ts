// tslint:disable
import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsStringWebModel
 */
export interface DodiAttributeOptionsStringWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * 
   * @type {number}
   * @memberof DodiAttributeOptionsStringWebModel
   */
  min?: number;
  /**
   * 
   * @type {number}
   * @memberof DodiAttributeOptionsStringWebModel
   */
  max?: number;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsStringWebModel
   */
  regex?: string;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsStringWebModel
   */
  defaultValue?: string;
}
