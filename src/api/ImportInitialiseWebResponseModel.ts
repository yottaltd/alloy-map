import { ImportWebModel } from './ImportWebModel';
/**
 * Initialise import web response model
 * @export
 * @interface ImportInitialiseWebResponseModel
 */
export interface ImportInitialiseWebResponseModel {
  /**
   * The import returned as a result
   * @type {ImportWebModel}
   * @memberof ImportInitialiseWebResponseModel
   */
  import: ImportWebModel;
  /**
   * The alloy task AId
   * @type {string}
   * @memberof ImportInitialiseWebResponseModel
   */
  backgroundTaskId: string;
}
