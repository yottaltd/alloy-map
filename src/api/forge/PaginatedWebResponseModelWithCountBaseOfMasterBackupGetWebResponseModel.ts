import { MasterBackupGetWebResponseModel } from './MasterBackupGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfMasterBackupGetWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfMasterBackupGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMasterBackupGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMasterBackupGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<MasterBackupGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMasterBackupGetWebResponseModel
   */
  results: Array<MasterBackupGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMasterBackupGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMasterBackupGetWebResponseModel
   */
  totalResults: number;
}
