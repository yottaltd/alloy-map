// tslint:disable
import { MeshWithOperationsSummaryWebResponseModel } from './MeshWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfMeshWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfMeshWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMeshWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMeshWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<MeshWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMeshWithOperationsSummaryWebResponseModel
   */
  results: Array<MeshWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMeshWithOperationsSummaryWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMeshWithOperationsSummaryWebResponseModel
   */
  totalResults: number;
}
