import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsNumberWebModel
 */
export interface DodiAttributeOptionsNumberWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * The number of decimal places to use for this attribute
   * @type {number}
   * @memberof DodiAttributeOptionsNumberWebModel
   */
  decimalPlaces: number;
  /**
   * The minimum value that this attribute can have
   * @type {number}
   * @memberof DodiAttributeOptionsNumberWebModel
   */
  min?: number;
  /**
   * The maximum value that this attribute can have
   * @type {number}
   * @memberof DodiAttributeOptionsNumberWebModel
   */
  max?: number;
  /**
   * The optional default value of this attribute
   * @type {number}
   * @memberof DodiAttributeOptionsNumberWebModel
   */
  defaultValue?: number;
}
