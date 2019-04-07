// tslint:disable
import { ImportSettingsAttributeWebModel } from './ImportSettingsAttributeWebModel';
import { ImportType } from './ImportType';
/**
 * Web model for standard-format import settings such as NSG
 * @export
 * @interface ImportSettingsStandardFormatWebModel
 */
export interface ImportSettingsStandardFormatWebModel {
  /**
   * Import type helps us know how to deserialise the input settings class via Discriminator
   * @type {ImportType}
   * @memberof ImportSettingsStandardFormatWebModel
   */
  type: ImportType;
  /**
   * The attribute mapping between import and destination design
   * @type {Array<ImportSettingsAttributeWebModel>}
   * @memberof ImportSettingsStandardFormatWebModel
   */
  attributes: Array<ImportSettingsAttributeWebModel>;
}
