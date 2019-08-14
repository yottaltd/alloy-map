// tslint:disable
import { ProfileDataScope } from './ProfileDataScope';
import { ProfileDataUnitValueWebModelBase } from './ProfileDataUnitValueWebModelBase';
/**
 * Web request model for a profile data unit create operation
 * @export
 * @interface ProfileDataUnitEditWebRequestModel
 */
export interface ProfileDataUnitEditWebRequestModel {
  /**
   * The name of the profile data unit
   * @type {string}
   * @memberof ProfileDataUnitEditWebRequestModel
   */
  name: string;
  /**
   * Scope of the profile data unit
   * @type {ProfileDataScope}
   * @memberof ProfileDataUnitEditWebRequestModel
   */
  dataScope: ProfileDataScope;
  /**
   * The value of the profile data unit
   * @type {ProfileDataUnitValueWebModelBase}
   * @memberof ProfileDataUnitEditWebRequestModel
   */
  value: ProfileDataUnitValueWebModelBase;
}
