import { AuditLogWebModel } from './AuditLogWebModel';
/**
 * 
 * @export
 * @interface AuditLogListWebResponseModel
 */
export interface AuditLogListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof AuditLogListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof AuditLogListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AuditLogWebModel>}
   * @memberof AuditLogListWebResponseModel
   */
  results: Array<AuditLogWebModel>;
}
