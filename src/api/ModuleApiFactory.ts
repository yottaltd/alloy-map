// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ModuleApiFp } from './ModuleApiFp';
import { ModuleApi } from './ModuleApi';
/**
 * ModuleApi - factory interface
 * @export
 */
export const ModuleApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Fetches an alloy module by its globally unique code (Guc).
     * @summary Get an alloy module by its code
     * @param {string} code The Guc for the module being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    moduleGet(code: string, options?: any) {
      return ModuleApiFp(configuration).moduleGet(code, options)(fetch, basePath);
    },
    /**
     * Fetches a list of all alloy modules installed for the current customer user session
     * @summary Get a list of customer installed alloy modules
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    moduleList(options?: any) {
      return ModuleApiFp(configuration).moduleList(options)(fetch, basePath);
    },
  };
};
