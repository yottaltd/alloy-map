import { ImportWebModel } from './ImportWebModel';
/**
 * Commit import web response model
 * @export
 * @interface ImportCommitWebResponseModel
 */
export interface ImportCommitWebResponseModel {
  /**
   * The import returned as a result
   * @type {ImportWebModel}
   * @memberof ImportCommitWebResponseModel
   */
  import: ImportWebModel;
  /**
   * The alloy task AId
   * @type {string}
   * @memberof ImportCommitWebResponseModel
   */
  backgroundTaskId: string;
}
