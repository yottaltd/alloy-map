// tslint:disable
import { ExtendedBulkApiRequestBase } from './ExtendedBulkApiRequestBase';
import { ExtendedBulkApi } from './ExtendedBulkApi';
/**
 * Request model for extended api bulk request
 * @export
 * @interface ExtendedBulkWebRequestModel
 */
export interface ExtendedBulkWebRequestModel {
  /**
   * The requests to be executed
   * @type {Array<ExtendedBulkApiRequestBase>}
   * @memberof ExtendedBulkWebRequestModel
   */
  requests: Array<ExtendedBulkApiRequestBase>;
}
