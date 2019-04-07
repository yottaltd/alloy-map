// tslint:disable
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
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfImportGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfImportGetWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<ImportGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfImportGetWebResponseModel
   */
  results: Array<ImportGetWebResponseModel>;
}
