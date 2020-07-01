import { AlloyExceptionWebModel } from './AlloyExceptionWebModel';
import { CollectionCode } from './CollectionCode';
import { ImportHeader } from './ImportHeader';
import { ImportMode } from './ImportMode';
import { ImportSettingsBaseWebModel } from './ImportSettingsBaseWebModel';
import { ImportStatus } from './ImportStatus';
import { ImportSummary } from './ImportSummary';
import { ImportType } from './ImportType';
import { MetadataWebModel } from './MetadataWebModel';
/**
 * Web model for import
 * @export
 * @interface ImportWebModel
 */
export interface ImportWebModel {
  /**
   * The import name
   * @type {string}
   * @memberof ImportWebModel
   */
  name: string;
  /**
   * The import Guc
   * @type {string}
   * @memberof ImportWebModel
   */
  code: string;
  /**
   * The import type
   * @type {ImportType}
   * @memberof ImportWebModel
   */
  type: ImportType;
  /**
   * The optional destination design Guc to import into
   * @type {string}
   * @memberof ImportWebModel
   */
  designCode?: string;
  /**
   * The optional destination collection to import into
   * @type {CollectionCode}
   * @memberof ImportWebModel
   */
  collection?: CollectionCode;
  /**
   * The mode to apply when importing (Append, Replace or Merge)
   * @type {ImportMode}
   * @memberof ImportWebModel
   */
  mode?: ImportMode;
  /**
   * The import status. Accepted values are New, Initialising, Initialised, Validating, Validated, Processing, Processed, Failed
   * @type {ImportStatus}
   * @memberof ImportWebModel
   */
  status: ImportStatus;
  /**
   * An array of file item id's to import
   * @type {Array<string>}
   * @memberof ImportWebModel
   */
  files: Array<string>;
  /**
   * An array of header items defining the structure of the import files
   * @type {Array<ImportHeader>}
   * @memberof ImportWebModel
   */
  headers: Array<ImportHeader>;
  /**
   * An optional JSON object that describes the import settings (info about matching attributes to file headers etc)
   * @type {ImportSettingsBaseWebModel}
   * @memberof ImportWebModel
   */
  settings?: ImportSettingsBaseWebModel;
  /**
   * An optional JSON object of the error
   * @type {AlloyExceptionWebModel}
   * @memberof ImportWebModel
   */
  error?: AlloyExceptionWebModel;
  /**
   * An optional import summary object with number of success/warning/error validated or committed records
   * @type {ImportSummary}
   * @memberof ImportWebModel
   */
  summary?: ImportSummary;
  /**
   * If import results were requested this id will be set to the results csv file id, so that the file can be downloaded via file api when the results csv task is done.
   * @type {string}
   * @memberof ImportWebModel
   */
  resultsCsvFileId?: string;
  /**
   * The import metadata
   * @type {MetadataWebModel}
   * @memberof ImportWebModel
   */
  metadata: MetadataWebModel;
}
