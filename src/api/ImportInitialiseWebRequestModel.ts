import { ImportType } from './ImportType';
/**
 * Web request model for an import initialise operation. This creates new import with user given name and type as well as load items from the import files.
 * @export
 * @interface ImportInitialiseWebRequestModel
 */
export interface ImportInitialiseWebRequestModel {
  /**
   * The import name
   * @type {string}
   * @memberof ImportInitialiseWebRequestModel
   */
  name: string;
  /**
   * The import type
   * @type {ImportType}
   * @memberof ImportInitialiseWebRequestModel
   */
  type: ImportType;
  /**
   * An array of file item id's to import
   * @type {Array<string>}
   * @memberof ImportInitialiseWebRequestModel
   */
  files: Array<string>;
}
