import { DodiWebModel } from './DodiWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfDodiWebModel
 */
export interface PaginatedWebResponseModelBaseOfDodiWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDodiWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDodiWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfDodiWebModel
   */
  results: Array<DodiWebModel>;
}
