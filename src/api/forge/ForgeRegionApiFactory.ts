// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ForgeRegionApiFp } from './ForgeRegionApiFp';
import { ForgeRegionApi } from './ForgeRegionApi';
/**
 * ForgeRegionApi - factory interface
 * @export
 */
export const ForgeRegionApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary Get the managed region
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    regionGet(options?: any) {
      return ForgeRegionApiFp(configuration).regionGet(options)(fetch, basePath);
    },
  };
};
