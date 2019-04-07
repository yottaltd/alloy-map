// tslint:disable
import { DateTimePrecision } from './DateTimePrecision';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsTimeWebModel
 */
export interface DodiAttributeOptionsTimeWebModel {
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
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsTimeWebModel
   */
  attributeType: string;
}
