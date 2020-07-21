import { BlueprintModuleWebResponseModel } from './BlueprintModuleWebResponseModel';
/**
 * 
 * @export
 * @interface ListBlueprintsWebResponseModel
 */
export interface ListBlueprintsWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ListBlueprintsWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ListBlueprintsWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<BlueprintModuleWebResponseModel>}
   * @memberof ListBlueprintsWebResponseModel
   */
  results: Array<BlueprintModuleWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof ListBlueprintsWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ListBlueprintsWebResponseModel
   */
  totalResults: number;
}
