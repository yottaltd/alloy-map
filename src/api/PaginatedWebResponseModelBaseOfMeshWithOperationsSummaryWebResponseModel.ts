import { MeshWithOperationsSummaryWebResponseModel } from './MeshWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfMeshWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfMeshWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfMeshWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfMeshWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<MeshWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfMeshWithOperationsSummaryWebResponseModel
   */
  results: Array<MeshWithOperationsSummaryWebResponseModel>;
}
