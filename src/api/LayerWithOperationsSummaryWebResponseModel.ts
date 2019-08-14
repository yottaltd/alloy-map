// tslint:disable
import { LayerOperationsSummaryWebModel } from './LayerOperationsSummaryWebModel';
import { LayerWebModel } from './LayerWebModel';
/**
 * Web model for a layer
 * @export
 * @interface LayerWithOperationsSummaryWebResponseModel
 */
export interface LayerWithOperationsSummaryWebResponseModel {
  /**
   * The retrieved layer
   * @type {LayerWebModel}
   * @memberof LayerWithOperationsSummaryWebResponseModel
   */
  layer: LayerWebModel;
  /**
   * The summary of the UAC operations allowed for this layer
   * @type {LayerOperationsSummaryWebModel}
   * @memberof LayerWithOperationsSummaryWebResponseModel
   */
  operationsSummary: LayerOperationsSummaryWebModel;
}
