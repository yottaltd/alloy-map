import { DodiOperationsSummaryWebModel } from './DodiOperationsSummaryWebModel';
import { DesignInterfaceWebModel } from './DesignInterfaceWebModel';
/**
 * Web model for a DesignInterface
 * @export
 * @interface DesignInterfaceWithOperationsSummaryWebResponseModel
 */
export interface DesignInterfaceWithOperationsSummaryWebResponseModel {
  /**
   * The DesignInterface returned as a result
   * @type {DesignInterfaceWebModel}
   * @memberof DesignInterfaceWithOperationsSummaryWebResponseModel
   */
  designInterface: DesignInterfaceWebModel;
  /**
   * The summary of the UAC operations allowed for this DesignInterface
   * @type {DodiOperationsSummaryWebModel}
   * @memberof DesignInterfaceWithOperationsSummaryWebResponseModel
   */
  operationsSummary: DodiOperationsSummaryWebModel;
}
