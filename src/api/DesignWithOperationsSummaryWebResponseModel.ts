import { DodiOperationsSummaryWebModel } from './DodiOperationsSummaryWebModel';
import { DesignWebModel } from './DesignWebModel';
/**
 * Web model for a design
 * @export
 * @interface DesignWithOperationsSummaryWebResponseModel
 */
export interface DesignWithOperationsSummaryWebResponseModel {
  /**
   * The design returned as a result
   * @type {DesignWebModel}
   * @memberof DesignWithOperationsSummaryWebResponseModel
   */
  design: DesignWebModel;
  /**
   * The summary of the UAC operations allowed for this design
   * @type {DodiOperationsSummaryWebModel}
   * @memberof DesignWithOperationsSummaryWebResponseModel
   */
  operationsSummary: DodiOperationsSummaryWebModel;
}
