// tslint:disable
import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsNumberWebModel
 */
export interface DodiAttributeOptionsNumberWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * 
   * @type {number}
   * @memberof DodiAttributeOptionsNumberWebModel
   */
  decimalPlaces: number;
  /**
   * 
   * @type {number}
   * @memberof DodiAttributeOptionsNumberWebModel
   */
  min?: number;
  /**
   * 
   * @type {number}
   * @memberof DodiAttributeOptionsNumberWebModel
   */
  max?: number;
  /**
   * 
   * @type {number}
   * @memberof DodiAttributeOptionsNumberWebModel
   */
  defaultValue?: number;
}
