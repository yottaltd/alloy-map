import { BasemapOperationsSummaryWebModel } from './BasemapOperationsSummaryWebModel';
import { BasemapWebModelBase } from './BasemapWebModelBase';
/**
 * Web model for a basemap
 * @export
 * @interface BasemapWithOperationsSummaryWebResponseModel
 */
export interface BasemapWithOperationsSummaryWebResponseModel {
  /**
   * The retrieved basemap
   * @type {BasemapWebModelBase}
   * @memberof BasemapWithOperationsSummaryWebResponseModel
   */
  basemap: BasemapWebModelBase;
  /**
   * The summary of the UAC operations allowed for this layer
   * @type {BasemapOperationsSummaryWebModel}
   * @memberof BasemapWithOperationsSummaryWebResponseModel
   */
  operationsSummary: BasemapOperationsSummaryWebModel;
}
