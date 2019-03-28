// tslint:disable
import { DodiOperationsSummaryWebModel } from './DodiOperationsSummaryWebModel';
import { DesignWebModel } from './DesignWebModel';
/**
 * Web model for a dodi attribute edit response
 * @export
 * @interface DodiAttributeEditWebResponseModel
 */
export interface DodiAttributeEditWebResponseModel {
  /**
   * The design with edited attribute
   * @type {DesignWebModel}
   * @memberof DodiAttributeEditWebResponseModel
   */
  design: DesignWebModel;
  /**
   * The summary of the UAC operations allowed for this design
   * @type {DodiOperationsSummaryWebModel}
   * @memberof DodiAttributeEditWebResponseModel
   */
  operationsSummary: DodiOperationsSummaryWebModel;
}
