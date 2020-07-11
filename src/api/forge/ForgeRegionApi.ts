import { BaseAPI } from './BaseAPI';
import { ForgeRegionApiFp } from './ForgeRegionApiFp';
/**
 * ForgeRegionApi - object-oriented interface
 * @export
 * @class ForgeRegionApi
 * @extends {BaseAPI}
 */
export class ForgeRegionApi extends BaseAPI {
  /**
   * 
   * @summary Get the managed region
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeRegionApi
   */
  public regionGet(options?: any) {
    return ForgeRegionApiFp(this.configuration).regionGet(options)(this.fetch, this.basePath);
  }

}
