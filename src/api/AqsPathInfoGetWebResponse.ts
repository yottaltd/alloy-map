// tslint:disable
import { DodiWebModel } from './DodiWebModel';
/**
 * Response model of an aqs path info get operation
 * @export
 * @interface AqsPathInfoGetWebResponse
 */
export interface AqsPathInfoGetWebResponse {
  /**
   * The dodis returned in the order in which they are crawled for the provided path
   * @type {Array<DodiWebModel>}
   * @memberof AqsPathInfoGetWebResponse
   */
  crawledDodis: Array<DodiWebModel>;
}
