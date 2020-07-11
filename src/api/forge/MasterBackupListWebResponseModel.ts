import { MasterBackupGetWebResponseModel } from './MasterBackupGetWebResponseModel';
/**
 * 
 * @export
 * @interface MasterBackupListWebResponseModel
 */
export interface MasterBackupListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof MasterBackupListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof MasterBackupListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<MasterBackupGetWebResponseModel>}
   * @memberof MasterBackupListWebResponseModel
   */
  results: Array<MasterBackupGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof MasterBackupListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof MasterBackupListWebResponseModel
   */
  totalResults: number;
}
