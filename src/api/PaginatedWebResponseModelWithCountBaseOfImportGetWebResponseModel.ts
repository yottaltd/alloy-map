import { ImportGetWebResponseModel } from './ImportGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfImportGetWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfImportGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfImportGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfImportGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ImportGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfImportGetWebResponseModel
   */
  results: Array<ImportGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfImportGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfImportGetWebResponseModel
   */
  totalResults: number;
}
