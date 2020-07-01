import { DateTimePrecision } from './DateTimePrecision';
import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsTimeWebModel
 */
export interface DodiAttributeOptionsTimeWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * The datetime attribute precision
   * @type {DateTimePrecision}
   * @memberof DodiAttributeOptionsTimeWebModel
   */
  precision?: DateTimePrecision;
  /**
   * The minimum valid value for the attribute
   * @type {string}
   * @memberof DodiAttributeOptionsTimeWebModel
   */
  min?: string;
  /**
   * The maximum valid value for the attribute
   * @type {string}
   * @memberof DodiAttributeOptionsTimeWebModel
   */
  max?: string;
  /**
   * The optional default value of this attribute
   * @type {string}
   * @memberof DodiAttributeOptionsTimeWebModel
   */
  defaultValue?: string;
}
