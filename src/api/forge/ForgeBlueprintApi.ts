// tslint:disable
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
   * @param {string} locale locale to use
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeBlueprintApi
   */
  public blueprintListBlueprints(locale: string, options?: any) {
    return ForgeBlueprintApiFp(this.configuration).blueprintListBlueprints(locale, options)(this.fetch, this.basePath);
  }

}
