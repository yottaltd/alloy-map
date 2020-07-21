import { ProfileDataUnitValueWebModelBase } from './ProfileDataUnitValueWebModelBase';
/**
 * An element of profile data
 * @export
 * @interface ProfileDataUnitWebModel
 */
export interface ProfileDataUnitWebModel {
  /**
   * The key of the profile datum
   * @type {string}
   * @memberof ProfileDataUnitWebModel
   */
  key: string;
  /**
   * The value of the profile datum
   * @type {ProfileDataUnitValueWebModelBase}
   * @memberof ProfileDataUnitWebModel
   */
  value: ProfileDataUnitValueWebModelBase;
}
