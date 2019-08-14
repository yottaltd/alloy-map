// tslint:disable
import { ProfileDataUnitValueWebModelBase } from './ProfileDataUnitValueWebModelBase';
/**
 * An element of profile data
 * @export
 * @interface ProfileDataUnitWebModel
 */
export interface ProfileDataUnitWebModel {
  /**
   * The name of the profile datum
   * @type {string}
   * @memberof ProfileDataUnitWebModel
   */
  name: string;
  /**
   * The value of the profile datum
   * @type {ProfileDataUnitValueWebModelBase}
   * @memberof ProfileDataUnitWebModel
   */
  value: ProfileDataUnitValueWebModelBase;
  /**
   * The code of the profile datum
   * @type {string}
   * @memberof ProfileDataUnitWebModel
   */
  code: string;
}
