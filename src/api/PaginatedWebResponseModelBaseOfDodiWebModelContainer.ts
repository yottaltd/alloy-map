import { DodiWebModel } from './DodiWebModel';
import { DodiWebModelContainer } from './DodiWebModelContainer';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfDodiWebModelContainer
 */
export interface PaginatedWebResponseModelBaseOfDodiWebModelContainer {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDodiWebModelContainer
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDodiWebModelContainer
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiWebModelContainer>}
   * @memberof PaginatedWebResponseModelBaseOfDodiWebModelContainer
   */
  results: Array<DodiWebModelContainer>;
}
