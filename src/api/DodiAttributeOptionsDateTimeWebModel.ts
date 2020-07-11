import { DateTimePrecision } from './DateTimePrecision';
import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsDateTimeWebModel
 */
export interface DodiAttributeOptionsDateTimeWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * The datetime attribute precision
   * @type {DateTimePrecision}
   * @memberof DodiAttributeOptionsDateTimeWebModel
   */
  precision?: DateTimePrecision;
  /**
   * The minimum valid value for the attribute
   * @type {string}
   * @memberof DodiAttributeOptionsDateTimeWebModel
   */
  min?: string;
  /**
   * The maximum valid value for the attribute
   * @type {string}
   * @memberof DodiAttributeOptionsDateTimeWebModel
   */
  max?: string;
  /**
   * The optional default value of this attribute
   * @type {string}
   * @memberof DodiAttributeOptionsDateTimeWebModel
   */
  defaultValue?: string;
}
