// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ProfileDataScope } from './ProfileDataScope';
import { ProfileDataUnitCreateWebRequestModel } from './ProfileDataUnitCreateWebRequestModel';
import { ProfileDataUnitEditWebRequestModel } from './ProfileDataUnitEditWebRequestModel';
import { ProfileDataUnitApiFp } from './ProfileDataUnitApiFp';
/**
 * ProfileDataUnitApi - object-oriented interface
 * @export
 * @class ProfileDataUnitApi
 * @extends {BaseAPI}
 */
export class ProfileDataUnitApi extends BaseAPI {
  /**
   * Creates a profile data unit based on the information sent in the model
   * @summary Create a profile data unit
   * @param {ProfileDataUnitCreateWebRequestModel} model Model containing the new profile data unit details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProfileDataUnitApi
   */
  public profileDataUnitCreate(model: ProfileDataUnitCreateWebRequestModel, options?: any) {
    return ProfileDataUnitApiFp(this.configuration).profileDataUnitCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Deletes a profile data unit based on the information sent in the model
   * @summary Delete a profile data unit
   * @param {string} code The Guc of the profile data unit to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProfileDataUnitApi
   */
  public profileDataUnitDelete(code: string, options?: any) {
    return ProfileDataUnitApiFp(this.configuration).profileDataUnitDelete(code, options)(this.fetch, this.basePath);
  }

  /**
   * Sets the value of an existing profile data unit.
   * @summary Edit a profile data unit
   * @param {string} code The code of the data unit to change
   * @param {ProfileDataUnitEditWebRequestModel} model Model containing the set profile data unit details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProfileDataUnitApi
   */
  public profileDataUnitEdit(code: string, model: ProfileDataUnitEditWebRequestModel, options?: any) {
    return ProfileDataUnitApiFp(this.configuration).profileDataUnitEdit(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of ProfileData optionally specifying page and the number of results to return per page.
   * @summary Get a list of ProfileData
   * @param {string} [discriminator] Optionally, the type of data to return as specified by the discriminators on ProfileDataUnitValueWebModelBase
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {Array<ProfileDataScope>} [dataScopes] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProfileDataUnitApi
   */
  public profileDataUnitList(discriminator?: string, page?: number, pageSize?: number, dataScopes?: Array<ProfileDataScope>, options?: any) {
    return ProfileDataUnitApiFp(this.configuration).profileDataUnitList(discriminator, page, pageSize, dataScopes, options)(this.fetch, this.basePath);
  }

}
