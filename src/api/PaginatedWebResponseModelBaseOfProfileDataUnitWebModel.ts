// tslint:disable
import { ProfileDataUnitWebModel } from './ProfileDataUnitWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfProfileDataUnitWebModel
 */
export interface PaginatedWebResponseModelBaseOfProfileDataUnitWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfProfileDataUnitWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfProfileDataUnitWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ProfileDataUnitWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfProfileDataUnitWebModel
   */
  results: Array<ProfileDataUnitWebModel>;
}
