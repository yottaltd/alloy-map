import { CustomReportDataSourceInfoBaseCreateWebModel } from './CustomReportDataSourceInfoBaseCreateWebModel';
/**
 * add data source web request model
 * @export
 * @interface AddDataSourceWebRequestModel
 */
export interface AddDataSourceWebRequestModel {
  /**
   * The name of the data source
   * @type {string}
   * @memberof AddDataSourceWebRequestModel
   */
  name: string;
  /**
   * Whether the data source is required at report generation time
   * @type {boolean}
   * @memberof AddDataSourceWebRequestModel
   */
  required: boolean;
  /**
   * The info about the data source
   * @type {CustomReportDataSourceInfoBaseCreateWebModel}
   * @memberof AddDataSourceWebRequestModel
   */
  dataSourceInfo?: CustomReportDataSourceInfoBaseCreateWebModel;
  /**
   * The signature is used to ensure that the custom report being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same custom report
   * @type {string}
   * @memberof AddDataSourceWebRequestModel
   */
  signature: string;
}
