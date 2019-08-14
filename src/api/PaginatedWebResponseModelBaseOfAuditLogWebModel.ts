// tslint:disable
import { AuditLogWebModel } from './AuditLogWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfAuditLogWebModel
 */
export interface PaginatedWebResponseModelBaseOfAuditLogWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAuditLogWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAuditLogWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AuditLogWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfAuditLogWebModel
   */
  results: Array<AuditLogWebModel>;
}
