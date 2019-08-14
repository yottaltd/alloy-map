// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ModuleApiFp } from './ModuleApiFp';
/**
 * ModuleApi - object-oriented interface
 * @export
 * @class ModuleApi
 * @extends {BaseAPI}
 */
export class ModuleApi extends BaseAPI {
  /**
   * Fetches an alloy module by its globally unique code (Guc).
   * @summary Get an alloy module by its code
   * @param {string} code The Guc for the module being requested
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ModuleApi
   */
  public moduleGet(code: string, options?: any) {
    return ModuleApiFp(this.configuration).moduleGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of all alloy modules installed for the current customer user session
   * @summary Get a list of customer installed alloy modules
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ModuleApi
   */
  public moduleList(options?: any) {
    return ModuleApiFp(this.configuration).moduleList(options)(this.fetch, this.basePath);
  }

}
