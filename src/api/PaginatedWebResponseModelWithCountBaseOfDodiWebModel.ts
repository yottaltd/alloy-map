// tslint:disable
import { DodiWebModel } from './DodiWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfDodiWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfDodiWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWebModel
   */
  results: Array<DodiWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWebModel
   */
  totalResults: number;
}
