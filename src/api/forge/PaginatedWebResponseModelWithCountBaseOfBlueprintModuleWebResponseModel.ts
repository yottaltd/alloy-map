import { BlueprintModuleWebResponseModel } from './BlueprintModuleWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfBlueprintModuleWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfBlueprintModuleWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBlueprintModuleWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBlueprintModuleWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<BlueprintModuleWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBlueprintModuleWebResponseModel
   */
  results: Array<BlueprintModuleWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBlueprintModuleWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBlueprintModuleWebResponseModel
   */
  totalResults: number;
}
