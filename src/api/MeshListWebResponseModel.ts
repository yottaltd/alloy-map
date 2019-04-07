// tslint:disable
import { MeshGetWebResponseModel } from './MeshGetWebResponseModel';
/**
 * Web response model for a list meshes operation
 * @export
 * @interface MeshListWebResponseModel
 */
export interface MeshListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof MeshListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof MeshListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof MeshListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof MeshListWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<MeshGetWebResponseModel>}
   * @memberof MeshListWebResponseModel
   */
  results: Array<MeshGetWebResponseModel>;
}
