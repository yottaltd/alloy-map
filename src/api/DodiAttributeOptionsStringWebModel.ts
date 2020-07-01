import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsStringWebModel
 */
export interface DodiAttributeOptionsStringWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * The minimum number of characters that this string must have
   * @type {number}
   * @memberof DodiAttributeOptionsStringWebModel
   */
  min?: number;
  /**
   * The maximum number of characters that this string must have
   * @type {number}
   * @memberof DodiAttributeOptionsStringWebModel
   */
  max?: number;
  /**
   * The regular expression that this attribute must match
   * @type {string}
   * @memberof DodiAttributeOptionsStringWebModel
   */
  regex?: string;
  /**
   * The optional default value of this attribute
   * @type {string}
   * @memberof DodiAttributeOptionsStringWebModel
   */
  defaultValue?: string;
}
