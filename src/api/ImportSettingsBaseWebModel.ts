// tslint:disable
import { ImportSettingsAttributeWebModel } from './ImportSettingsAttributeWebModel';
import { ImportType } from './ImportType';
/**
 * Import base settings web model
 * @export
 * @interface ImportSettingsBaseWebModel
 */
export interface ImportSettingsBaseWebModel {
  /**
   * Import type helps us know how to deserialise the input settings class via Discriminator
   * @type {ImportType}
   * @memberof ImportSettingsBaseWebModel
   */
  type: ImportType;
  /**
   * The attribute mapping between import and destination design
   * @type {Array<ImportSettingsAttributeWebModel>}
   * @memberof ImportSettingsBaseWebModel
   */
  attributes: Array<ImportSettingsAttributeWebModel>;
}
