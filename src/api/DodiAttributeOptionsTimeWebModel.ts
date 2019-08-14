// tslint:disable
import { DateTimePrecision } from './DateTimePrecision';
import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsTimeWebModel
 */
export interface DodiAttributeOptionsTimeWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * 
   * @type {DateTimePrecision}
   * @memberof DodiAttributeOptionsTimeWebModel
   */
  precision?: DateTimePrecision;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsTimeWebModel
   */
  min?: string;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsTimeWebModel
   */
  max?: string;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsTimeWebModel
   */
  defaultValue?: string;
}
