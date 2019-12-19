// tslint:disable
import { BlueprintModuleWebResponseModel } from './BlueprintModuleWebResponseModel';
/**
 * List blueprints response
 * @export
 * @interface ListBlueprintsWebResponseModel
 */
export interface ListBlueprintsWebResponseModel {
  /**
   * Blueprints, listed by module
   * @type {Array<BlueprintModuleWebResponseModel>}
   * @memberof ListBlueprintsWebResponseModel
   */
  modules: Array<BlueprintModuleWebResponseModel>;
}
