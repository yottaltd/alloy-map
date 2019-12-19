// tslint:disable
import { CustomReportDataSourceWebModel } from './CustomReportDataSourceWebModel';
import { CustomReportWebModel } from './CustomReportWebModel';
/**
 * Add data source web response model
 * @export
 * @interface AddDataSourceWebResponseModel
 */
export interface AddDataSourceWebResponseModel {
  /**
   * The custom report
   * @type {CustomReportWebModel}
   * @memberof AddDataSourceWebResponseModel
   */
  customReport: CustomReportWebModel;
  /**
   * The data source that has been added
   * @type {CustomReportDataSourceWebModel}
   * @memberof AddDataSourceWebResponseModel
   */
  addedDataSource: CustomReportDataSourceWebModel;
}
