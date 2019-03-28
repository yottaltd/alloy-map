// tslint:disable
import { DodiWebModel } from './DodiWebModel';
import { DodiWebModelContainer } from './DodiWebModelContainer';
/**
 * Response model of an applicable dodi operations
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
  /**
   * 
   * @type {Array<DodiWebModelContainer>}
   * @memberof ApplicableDodiContainerListWebResponseModel
   */
  results: Array<DodiWebModelContainer>;
}
