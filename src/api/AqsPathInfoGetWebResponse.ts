// tslint:disable
import { AqsPathInfoElementWebModel } from './AqsPathInfoElementWebModel';
import { DodiWebModel } from './DodiWebModel';
/**
 * Response model of an aqs path info get operation
 * @export
 * @interface AqsPathInfoGetWebResponse
 */
export interface AqsPathInfoGetWebResponse {
  /**
   * The dodis returned in the order in which they are crawled for the provided path This property is obsolete and PathInfoElements should be used instead
   * @type {Array<DodiWebModel>}
   * @memberof AqsPathInfoGetWebResponse
   */
  crawledDodis: Array<DodiWebModel>;
  /**
   * The path info elements returned in the order in which they are crawled for the provided path
   * @type {Array<AqsPathInfoElementWebModel>}
   * @memberof AqsPathInfoGetWebResponse
   */
  pathInfoElements: Array<AqsPathInfoElementWebModel>;
}
