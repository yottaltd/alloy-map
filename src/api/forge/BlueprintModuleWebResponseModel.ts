import { BlueprintModuleDependencyWebResponseModel } from './BlueprintModuleDependencyWebResponseModel';
import { BlueprintWebResponseModel } from './BlueprintWebResponseModel';
/**
 * Module of blueprints response
 * @export
 * @interface BlueprintModuleWebResponseModel
 */
export interface BlueprintModuleWebResponseModel {
  /**
   * Module name
   * @type {string}
   * @memberof BlueprintModuleWebResponseModel
   */
  name: string;
  /**
   * Module Guc
   * @type {string}
   * @memberof BlueprintModuleWebResponseModel
   */
  code: string;
  /**
   * Blueprints in the module
   * @type {Array<BlueprintWebResponseModel>}
   * @memberof BlueprintModuleWebResponseModel
   */
  blueprints: Array<BlueprintWebResponseModel>;
  /**
   * All modules that this module depends on
   * @type {Array<BlueprintModuleDependencyWebResponseModel>}
   * @memberof BlueprintModuleWebResponseModel
   */
  dependencies: Array<BlueprintModuleDependencyWebResponseModel>;
  /**
   * All modules that this module affects
   * @type {Array<BlueprintModuleDependencyWebResponseModel>}
   * @memberof BlueprintModuleWebResponseModel
   */
  affects: Array<BlueprintModuleDependencyWebResponseModel>;
}
