// tslint:disable
import { DodiOperationsSummaryWebModel } from './DodiOperationsSummaryWebModel';
import { DesignWebModel } from './DesignWebModel';
/**
 * Web model for a design edit response
 * @export
 * @interface DesignEditWebResponseModel
 */
export interface DesignEditWebResponseModel {
  /**
   * The edited design
   * @type {DesignWebModel}
   * @memberof DesignEditWebResponseModel
   */
  design: DesignWebModel;
  /**
   * The summary of the UAC operations allowed for this design
   * @type {DodiOperationsSummaryWebModel}
   * @memberof DesignEditWebResponseModel
   */
  operationsSummary: DodiOperationsSummaryWebModel;
}
