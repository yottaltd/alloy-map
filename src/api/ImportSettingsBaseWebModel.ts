// tslint:disable
import { ImportSettingsAttributeWebModel } from './ImportSettingsAttributeWebModel';
/**
 * Import base settings web model
 * @export
 * @interface ImportSettingsBaseWebModel
 */
export interface ImportSettingsBaseWebModel {
  /**
   * The attribute mapping between import and destination design
   * @type {Array<ImportSettingsAttributeWebModel>}
   * @memberof ImportSettingsBaseWebModel
   */
  attributes: Array<ImportSettingsAttributeWebModel>;
  /**
   * 
   * @type {string}
   * @memberof ImportSettingsBaseWebModel
   */
  discriminator: string;
}
