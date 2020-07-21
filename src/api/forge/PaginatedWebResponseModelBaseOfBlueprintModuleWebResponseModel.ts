import { BlueprintModuleWebResponseModel } from './BlueprintModuleWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfBlueprintModuleWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfBlueprintModuleWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfBlueprintModuleWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfBlueprintModuleWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<BlueprintModuleWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfBlueprintModuleWebResponseModel
   */
  results: Array<BlueprintModuleWebResponseModel>;
}
