import { BoundingBoxWebModel } from './BoundingBoxWebModel';
import { CustomReportControlPropertyFromDataSourceWebModel } from './CustomReportControlPropertyFromDataSourceWebModel';
/**
 * 
 * @export
 * @interface CustomReportControlPropertyWebModelOfBoundingBoxWebModel
 */
export interface CustomReportControlPropertyWebModelOfBoundingBoxWebModel {
  /**
   * 
   * @type {BoundingBoxWebModel}
   * @memberof CustomReportControlPropertyWebModelOfBoundingBoxWebModel
   */
  valueConstant?: BoundingBoxWebModel;
  /**
   * 
   * @type {CustomReportControlPropertyFromDataSourceWebModel}
   * @memberof CustomReportControlPropertyWebModelOfBoundingBoxWebModel
   */
  valueFromDataSource?: CustomReportControlPropertyFromDataSourceWebModel;
}
