import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsDateWebModel
 */
export interface DodiAttributeOptionsDateWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * The minimum valid value for the attribute
   * @type {string}
   * @memberof DodiAttributeOptionsDateWebModel
   */
  min?: string;
  /**
   * The maximum valid value for the attribute
   * @type {string}
   * @memberof DodiAttributeOptionsDateWebModel
   */
  max?: string;
  /**
   * The optional default value of this attribute
   * @type {string}
   * @memberof DodiAttributeOptionsDateWebModel
   */
  defaultValue?: string;
}
