// tslint:disable
import { DodiOperationsSummaryWebModel } from './DodiOperationsSummaryWebModel';
import { DesignWebModel } from './DesignWebModel';
/**
 * 
 * @export
 * @interface DesignWithOperationsSummaryWebResponseModel
 */
export interface DesignWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {DesignWebModel}
   * @memberof DesignWithOperationsSummaryWebResponseModel
   */
  design: DesignWebModel;
  /**
   * 
   * @type {DodiOperationsSummaryWebModel}
   * @memberof DesignWithOperationsSummaryWebResponseModel
   */
  operationsSummary: DodiOperationsSummaryWebModel;
}
