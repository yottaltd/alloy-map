// tslint:disable
import { ProfileDataUnitWebModel } from './ProfileDataUnitWebModel';
/**
 * Web response model for a list meshes operation
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
