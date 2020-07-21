import { ModuleGetWebResponseModel } from './ModuleGetWebResponseModel';
/**
 * List modules web response model
 * @export
 * @interface ModuleListWebResponseModel
 */
export interface ModuleListWebResponseModel {
  /**
   * Installed customer modules
   * @type {Array<ModuleGetWebResponseModel>}
   * @memberof ModuleListWebResponseModel
   */
  modules: Array<ModuleGetWebResponseModel>;
}
