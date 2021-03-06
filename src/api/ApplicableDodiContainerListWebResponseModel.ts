import { DodiWebModel } from './DodiWebModel';
import { DodiWebModelContainer } from './DodiWebModelContainer';
/**
 * 
 * @export
 * @interface ApplicableDodiContainerListWebResponseModel
 */
export interface ApplicableDodiContainerListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ApplicableDodiContainerListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ApplicableDodiContainerListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiWebModelContainer>}
   * @memberof ApplicableDodiContainerListWebResponseModel
   */
  results: Array<DodiWebModelContainer>;
  /**
   * 
   * @type {number}
   * @memberof ApplicableDodiContainerListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ApplicableDodiContainerListWebResponseModel
   */
  totalResults: number;
}
