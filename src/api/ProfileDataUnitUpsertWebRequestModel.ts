import { ProfileDataScope } from './ProfileDataScope';
import { ProfileDataUnitValueWebModelBase } from './ProfileDataUnitValueWebModelBase';
/**
 * Web request model for a profile data unit edit operation
 * @export
 * @interface ProfileDataUnitUpsertWebRequestModel
 */
export interface ProfileDataUnitUpsertWebRequestModel {
  /**
   * Scope of the profile data unit
   * @type {ProfileDataScope}
   * @memberof ProfileDataUnitUpsertWebRequestModel
   */
  dataScope: ProfileDataScope;
  /**
   * The value of the profile data unit
   * @type {ProfileDataUnitValueWebModelBase}
   * @memberof ProfileDataUnitUpsertWebRequestModel
   */
  value: ProfileDataUnitValueWebModelBase;
}
