// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ProfileDataScope } from './ProfileDataScope';
import { ProfileDataUnitCreateWebRequestModel } from './ProfileDataUnitCreateWebRequestModel';
import { ProfileDataUnitEditWebRequestModel } from './ProfileDataUnitEditWebRequestModel';
import { ProfileDataUnitApiFp } from './ProfileDataUnitApiFp';
import { ProfileDataUnitApi } from './ProfileDataUnitApi';
/**
 * ProfileDataUnitApi - factory interface
 * @export
 */
export const ProfileDataUnitApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Creates a profile data unit based on the information sent in the model
     * @summary Create a profile data unit
     * @param {ProfileDataUnitCreateWebRequestModel} model Model containing the new profile data unit details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitCreate(model: ProfileDataUnitCreateWebRequestModel, options?: any) {
      return ProfileDataUnitApiFp(configuration).profileDataUnitCreate(model, options)(fetch, basePath);
    },
    /**
     * Deletes a profile data unit based on the information sent in the model
     * @summary Delete a profile data unit
     * @param {string} code The Guc of the profile data unit to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitDelete(code: string, options?: any) {
      return ProfileDataUnitApiFp(configuration).profileDataUnitDelete(code, options)(fetch, basePath);
    },
    /**
     * Sets the value of an existing profile data unit.
     * @summary Edit a profile data unit
     * @param {string} code The code of the data unit to change
     * @param {ProfileDataUnitEditWebRequestModel} model Model containing the set profile data unit details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitEdit(code: string, model: ProfileDataUnitEditWebRequestModel, options?: any) {
      return ProfileDataUnitApiFp(configuration).profileDataUnitEdit(code, model, options)(fetch, basePath);
    },
    /**
     * Fetches a list of ProfileData optionally specifying page and the number of results to return per page.
     * @summary Get a list of ProfileData
     * @param {string} [discriminator] Optionally, the type of data to return as specified by the discriminators on ProfileDataUnitValueWebModelBase
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {Array<ProfileDataScope>} [dataScopes] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitList(discriminator?: string, page?: number, pageSize?: number, dataScopes?: Array<ProfileDataScope>, options?: any) {
      return ProfileDataUnitApiFp(configuration).profileDataUnitList(discriminator, page, pageSize, dataScopes, options)(fetch, basePath);
    },
  };
};
