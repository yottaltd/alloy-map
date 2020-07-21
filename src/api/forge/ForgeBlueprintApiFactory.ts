import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { BlueprintApplyWebRequestModel } from './BlueprintApplyWebRequestModel';
import { ForgeBlueprintApiFp } from './ForgeBlueprintApiFp';
import { ForgeBlueprintApi } from './ForgeBlueprintApi';
/**
 * ForgeBlueprintApi - factory interface
 * @export
 */
export const ForgeBlueprintApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary Apply the module to the customer
     * @param {BlueprintApplyWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    blueprintApplyBlueprints(model: BlueprintApplyWebRequestModel, options?: any) {
      return ForgeBlueprintApiFp(configuration).blueprintApplyBlueprints(model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List blueprints by modules
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    blueprintGetBlueprintData(options?: any) {
      return ForgeBlueprintApiFp(configuration).blueprintGetBlueprintData(options)(fetch, basePath);
    },
    /**
     * 
     * @summary List blueprints by modules
     * @param {string} [locale] locale to use
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    blueprintListBlueprints(locale?: string, page?: number, pageSize?: number, options?: any) {
      return ForgeBlueprintApiFp(configuration).blueprintListBlueprints(locale, page, pageSize, options)(fetch, basePath);
    },
  };
};
