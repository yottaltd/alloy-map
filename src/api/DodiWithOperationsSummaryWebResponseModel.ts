// tslint:disable
import { DodiOperationsSummaryWebModel } from './DodiOperationsSummaryWebModel';
import { DodiWebModel } from './DodiWebModel';
/**
 * 
 * @export
 * @interface DodiWithOperationsSummaryWebResponseModel
 */
export interface DodiWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {DodiWebModel}
   * @memberof DodiWithOperationsSummaryWebResponseModel
   */
  dodi: DodiWebModel;
  /**
   * 
   * @type {DodiOperationsSummaryWebModel}
   * @memberof DodiWithOperationsSummaryWebResponseModel
   */
  operationsSummary: DodiOperationsSummaryWebModel;
}
