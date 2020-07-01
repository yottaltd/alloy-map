import { ProfileDataUnitWebModel } from './ProfileDataUnitWebModel';
/**
 * 
 * @export
 * @interface ProfileDataUnitListWebResponseModel
 */
export interface ProfileDataUnitListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ProfileDataUnitListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ProfileDataUnitListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ProfileDataUnitWebModel>}
   * @memberof ProfileDataUnitListWebResponseModel
   */
  results: Array<ProfileDataUnitWebModel>;
}
