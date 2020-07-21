import { ImportGetWebResponseModel } from './ImportGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfImportGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfImportGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfImportGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfImportGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ImportGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfImportGetWebResponseModel
   */
  results: Array<ImportGetWebResponseModel>;
}
