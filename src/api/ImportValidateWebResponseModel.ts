import { ImportWebModel } from './ImportWebModel';
/**
 * Validate import web response model
 * @export
 * @interface ImportValidateWebResponseModel
 */
export interface ImportValidateWebResponseModel {
  /**
   * The import returned as a result
   * @type {ImportWebModel}
   * @memberof ImportValidateWebResponseModel
   */
  import: ImportWebModel;
  /**
   * The alloy task AId
   * @type {string}
   * @memberof ImportValidateWebResponseModel
   */
  backgroundTaskId: string;
}
