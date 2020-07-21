import { MeshWithOperationsSummaryWebResponseModel } from './MeshWithOperationsSummaryWebResponseModel';
/**
 * 
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
   * @type {Array<MeshWithOperationsSummaryWebResponseModel>}
   * @memberof MeshListWebResponseModel
   */
  results: Array<MeshWithOperationsSummaryWebResponseModel>;
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
}
