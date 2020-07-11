import { DodiWebModel } from './DodiWebModel';
import { DodiWebModelContainer } from './DodiWebModelContainer';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfDodiWebModelContainer
 */
export interface PaginatedWebResponseModelWithCountBaseOfDodiWebModelContainer {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWebModelContainer
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWebModelContainer
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiWebModelContainer>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWebModelContainer
   */
  results: Array<DodiWebModelContainer>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWebModelContainer
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWebModelContainer
   */
  totalResults: number;
}
