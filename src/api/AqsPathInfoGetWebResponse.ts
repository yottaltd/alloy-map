import { AqsPathInfoElementWebModel } from './AqsPathInfoElementWebModel';
/**
 * Response model of an aqs path info get operation
 * @export
 * @interface AqsPathInfoGetWebResponse
 */
export interface AqsPathInfoGetWebResponse {
  /**
   * The path info elements returned in the order in which they are crawled for the provided path
   * @type {Array<AqsPathInfoElementWebModel>}
   * @memberof AqsPathInfoGetWebResponse
   */
  pathInfoElements: Array<AqsPathInfoElementWebModel>;
}
