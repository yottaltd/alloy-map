import { BaseAPI } from './BaseAPI';
import { BlueprintApplyWebRequestModel } from './BlueprintApplyWebRequestModel';
import { ForgeBlueprintApiFp } from './ForgeBlueprintApiFp';
/**
 * ForgeBlueprintApi - object-oriented interface
 * @export
 * @class ForgeBlueprintApi
 * @extends {BaseAPI}
 */
export class ForgeBlueprintApi extends BaseAPI {
  /**
   * 
   * @summary Apply the module to the customer
   * @param {BlueprintApplyWebRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeBlueprintApi
   */
  public blueprintApplyBlueprints(model: BlueprintApplyWebRequestModel, options?: any) {
    return ForgeBlueprintApiFp(this.configuration).blueprintApplyBlueprints(model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List blueprints by modules
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeBlueprintApi
   */
  public blueprintGetBlueprintData(options?: any) {
    return ForgeBlueprintApiFp(this.configuration).blueprintGetBlueprintData(options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List blueprints by modules
   * @param {string} [locale] locale to use
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeBlueprintApi
   */
  public blueprintListBlueprints(locale?: string, page?: number, pageSize?: number, options?: any) {
    return ForgeBlueprintApiFp(this.configuration).blueprintListBlueprints(locale, page, pageSize, options)(this.fetch, this.basePath);
  }

}
