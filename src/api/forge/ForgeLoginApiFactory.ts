// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { LoginWebRequestModel } from './LoginWebRequestModel';
import { ForgeLoginApiFp } from './ForgeLoginApiFp';
import { ForgeLoginApi } from './ForgeLoginApi';
/**
 * ForgeLoginApi - factory interface
 * @export
 */
export const ForgeLoginApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary Login to the forge api using auth0 authentication details. These are not the same as your Alloy authentication details.
     * @param {LoginWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    loginLogin(model: LoginWebRequestModel, options?: any) {
      return ForgeLoginApiFp(configuration).loginLogin(model, options)(fetch, basePath);
    },
  };
};
