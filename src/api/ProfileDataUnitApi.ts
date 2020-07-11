import { BaseAPI } from './BaseAPI';
import { ProfileDataScope } from './ProfileDataScope';
import { ProfileDataUnitUpsertWebRequestModel } from './ProfileDataUnitUpsertWebRequestModel';
import { ProfileDataUnitApiFp } from './ProfileDataUnitApiFp';
/**
 * ProfileDataUnitApi - object-oriented interface
 * @export
 * @class ProfileDataUnitApi
 * @extends {BaseAPI}
 */
export class ProfileDataUnitApi extends BaseAPI {
  /**
   * 
   * @summary Delete a profile data unit
   * @param {string} key The key of the profile data unit to delete
   * @param {'Customer' | 'User'} [dataScope] The scope of the profile data unit to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProfileDataUnitApi
   */
  public profileDataUnitDelete(key: string, dataScope?: 'Customer' | 'User', options?: any) {
    return ProfileDataUnitApiFp(this.configuration).profileDataUnitDelete(key, dataScope, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get a profile data unit
   * @param {string} key The key of the profile data unit to fetch
   * @param {'Customer' | 'User'} [dataScope] The scope of the profile data unit to fetch
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProfileDataUnitApi
   */
  public profileDataUnitGet(key: string, dataScope?: 'Customer' | 'User', options?: any) {
    return ProfileDataUnitApiFp(this.configuration).profileDataUnitGet(key, dataScope, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of ProfileData optionally specifying page and the number of results to return per page.
   * @summary Get a list of ProfileData
   * @param {string} [discriminator] Optionally, the type of data to return as specified by the discriminators on ProfileDataUnitValueWebModelBase
   * @param {Array<ProfileDataScope>} [dataScopes] Optionally, the data scope to filter by to get only Customer (Global) level profile data or only User level ones
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProfileDataUnitApi
   */
  public profileDataUnitList(discriminator?: string, dataScopes?: Array<ProfileDataScope>, page?: number, pageSize?: number, options?: any) {
    return ProfileDataUnitApiFp(this.configuration).profileDataUnitList(discriminator, dataScopes, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Sets the value of an existing profile data unit. If unit does not exist it is created.
   * @summary Upsert a profile data unit
   * @param {string} key The key of the data unit to upsert
   * @param {ProfileDataUnitUpsertWebRequestModel} model Model containing the set profile data unit details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProfileDataUnitApi
   */
  public profileDataUnitUpsert(key: string, model: ProfileDataUnitUpsertWebRequestModel, options?: any) {
    return ProfileDataUnitApiFp(this.configuration).profileDataUnitUpsert(key, model, options)(this.fetch, this.basePath);
  }

}
