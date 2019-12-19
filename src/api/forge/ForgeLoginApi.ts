// tslint:disable
import { BaseAPI } from './BaseAPI';
import { LoginWebRequestModel } from './LoginWebRequestModel';
import { ForgeLoginApiFp } from './ForgeLoginApiFp';
/**
 * ForgeLoginApi - object-oriented interface
 * @export
 * @class ForgeLoginApi
 * @extends {BaseAPI}
 */
export class ForgeLoginApi extends BaseAPI {
  /**
   * 
   * @summary Login to the forge api using auth0 authentication details. These are not the same as your Alloy authentication details.
   * @param {LoginWebRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeLoginApi
   */
  public loginLogin(model: LoginWebRequestModel, options?: any) {
    return ForgeLoginApiFp(this.configuration).loginLogin(model, options)(this.fetch, this.basePath);
  }

}
