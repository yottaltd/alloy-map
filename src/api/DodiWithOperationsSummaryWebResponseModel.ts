import { DodiOperationsSummaryWebModel } from './DodiOperationsSummaryWebModel';
import { DodiWebModel } from './DodiWebModel';
/**
 * Web model for a dodi with operations summary
 * @export
 * @interface DodiWithOperationsSummaryWebResponseModel
 */
export interface DodiWithOperationsSummaryWebResponseModel {
  /**
   * The dodi returned as a result
   * @type {DodiWebModel}
   * @memberof DodiWithOperationsSummaryWebResponseModel
   */
  dodi: DodiWebModel;
  /**
   * The summary of the UAC operations allowed for this dodi
   * @type {DodiOperationsSummaryWebModel}
   * @memberof DodiWithOperationsSummaryWebResponseModel
   */
  operationsSummary: DodiOperationsSummaryWebModel;
}
