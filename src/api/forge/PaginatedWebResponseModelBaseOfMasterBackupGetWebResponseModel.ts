import { MasterBackupGetWebResponseModel } from './MasterBackupGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfMasterBackupGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfMasterBackupGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfMasterBackupGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfMasterBackupGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<MasterBackupGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfMasterBackupGetWebResponseModel
   */
  results: Array<MasterBackupGetWebResponseModel>;
}
