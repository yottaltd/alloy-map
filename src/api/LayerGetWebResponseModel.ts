// tslint:disable
import { LayerOperationsSummaryWebModel } from './LayerOperationsSummaryWebModel';
import { LayerWebModel } from './LayerWebModel';
/**
 * Web model for a layer
 * @export
 * @interface LayerGetWebResponseModel
 */
export interface LayerGetWebResponseModel {
  /**
   * The retrieved layer
   * @type {LayerWebModel}
   * @memberof LayerGetWebResponseModel
   */
  layer: LayerWebModel;
  /**
   * The summary of the UAC operations allowed for this layer
   * @type {LayerOperationsSummaryWebModel}
   * @memberof LayerGetWebResponseModel
   */
  operationsSummary: LayerOperationsSummaryWebModel;
}
