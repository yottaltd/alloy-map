
/**
 * Validate import web response model
 * @export
 * @interface ExportWebResponseModel
 */
export interface ExportWebResponseModel {
  /**
   * The export task idAId        Use this in `GET api/export/file-id` to request the file id for the export once completed
   * @type {string}
   * @memberof ExportWebResponseModel
   */
  backgroundTaskId: string;
  /**
   * The file name that will be used for the export
   * @type {string}
   * @memberof ExportWebResponseModel
   */
  fileName: string;
}
