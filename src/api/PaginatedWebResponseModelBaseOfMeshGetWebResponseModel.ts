// tslint:disable
import { MeshGetWebResponseModel } from './MeshGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfMeshGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfMeshGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfMeshGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfMeshGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfMeshGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfMeshGetWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<MeshGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfMeshGetWebResponseModel
   */
  results: Array<MeshGetWebResponseModel>;
}
