import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsSeasonalWebModel
 */
export interface DodiAttributeOptionsSeasonalWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * The minimum valid value for the attribute
   * @type {string}
   * @memberof DodiAttributeOptionsSeasonalWebModel
   */
  min?: string;
  /**
   * The maximum valid value for the attribute
   * @type {string}
   * @memberof DodiAttributeOptionsSeasonalWebModel
   */
  max?: string;
  /**
   * The optional default value of this attribute
   * @type {string}
   * @memberof DodiAttributeOptionsSeasonalWebModel
   */
  defaultValue?: string;
}
