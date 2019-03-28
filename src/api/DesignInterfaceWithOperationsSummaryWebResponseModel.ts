// tslint:disable
import { DodiOperationsSummaryWebModel } from './DodiOperationsSummaryWebModel';
import { DesignInterfaceWebModel } from './DesignInterfaceWebModel';
/**
 * 
 * @export
 * @interface DesignInterfaceWithOperationsSummaryWebResponseModel
 */
export interface DesignInterfaceWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {DesignInterfaceWebModel}
   * @memberof DesignInterfaceWithOperationsSummaryWebResponseModel
   */
  designInterface: DesignInterfaceWebModel;
  /**
   * 
   * @type {DodiOperationsSummaryWebModel}
   * @memberof DesignInterfaceWithOperationsSummaryWebResponseModel
   */
  operationsSummary: DodiOperationsSummaryWebModel;
}
