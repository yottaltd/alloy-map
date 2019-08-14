// tslint:disable
import { DateTimePrecision } from './DateTimePrecision';
import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsDateTimeWebModel
 */
export interface DodiAttributeOptionsDateTimeWebModel extends DodiAttributeOptionsWebModelBase {
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
}
