
/**
 * Web request model for an Aqs path info get operation
 * @export
 * @interface AqsPathInfoGetWebRequestModel
 */
export interface AqsPathInfoGetWebRequestModel {
  /**
   * The Guc of the dodi the path is starting from
   * @type {string}
   * @memberof AqsPathInfoGetWebRequestModel
   */
  rootDodiCode: string;
  /**
   * The aqs path to return the crawled dodis for
   * @type {string}
   * @memberof AqsPathInfoGetWebRequestModel
   */
  aqsPath: string;
}
