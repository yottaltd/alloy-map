// tslint:disable
import { ProfileDataScope } from './ProfileDataScope';
import { ProfileDataUnitValueWebModelBase } from './ProfileDataUnitValueWebModelBase';
/**
 * Web request model for a profile data unit create operation
 * @export
 * @interface ProfileDataUnitCreateWebRequestModel
 */
export interface ProfileDataUnitCreateWebRequestModel {
  /**
   * The name of the profile data unit
   * @type {string}
   * @memberof ProfileDataUnitCreateWebRequestModel
   */
  name: string;
  /**
   * If true, the data unit will be available for the whole customer project
   * @type {ProfileDataScope}
   * @memberof ProfileDataUnitCreateWebRequestModel
   */
  dataScope: ProfileDataScope;
  /**
   * The value of the profile data unit
   * @type {ProfileDataUnitValueWebModelBase}
   * @memberof ProfileDataUnitCreateWebRequestModel
   */
  value: ProfileDataUnitValueWebModelBase;
}
