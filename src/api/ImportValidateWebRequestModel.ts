// tslint:disable
import { CollectionCode } from './CollectionCode';
import { ImportMode } from './ImportMode';
import { ImportSettingsBaseWebModel } from './ImportSettingsBaseWebModel';
/**
 * Web request model for an import validate operation.
 * @export
 * @interface ImportValidateWebRequestModel
 */
export interface ImportValidateWebRequestModel {
  /**
   * The optional Guc of the destination design to import items
   * @type {string}
   * @memberof ImportValidateWebRequestModel
   */
  designCode?: string;
  /**
   * The optional destination collection to which to import items
   * @type {CollectionCode}
   * @memberof ImportValidateWebRequestModel
   */
  collection?: CollectionCode;
  /**
   * The import mode (Append, Replace or Merge)
   * @type {ImportMode}
   * @memberof ImportValidateWebRequestModel
   */
  mode: ImportMode;
  /**
   * A JSON object that describes the import settings
   * @type {ImportSettingsBaseWebModel}
   * @memberof ImportValidateWebRequestModel
   */
  settings: ImportSettingsBaseWebModel;
  /**
   * The import signature that ensures the operation is being applied on the last version of the import
   * @type {string}
   * @memberof ImportValidateWebRequestModel
   */
  signature: string;
}
