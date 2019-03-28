// tslint:disable
import { DateTimePrecision } from './DateTimePrecision';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsDateTimeWebModel
 */
export interface DodiAttributeOptionsDateTimeWebModel {
  /**
   * 
   * @type {DateTimePrecision}
   * @memberof DodiAttributeOptionsDateTimeWebModel
   */
  precision?: DateTimePrecision;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsDateTimeWebModel
   */
  min?: string;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsDateTimeWebModel
   */
  max?: string;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsDateTimeWebModel
   */
  defaultValue?: string;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsDateTimeWebModel
   */
  attributeType: string;
}
