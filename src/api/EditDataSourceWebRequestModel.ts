import { CustomReportDataSourceInfoBaseEditWebModel } from './CustomReportDataSourceInfoBaseEditWebModel';
/**
 * Edit data source web request model
 * @export
 * @interface EditDataSourceWebRequestModel
 */
export interface EditDataSourceWebRequestModel {
  /**
   * The name of the data source
   * @type {string}
   * @memberof EditDataSourceWebRequestModel
   */
  name: string;
  /**
   * Whether the data source is required at report generation time
   * @type {boolean}
   * @memberof EditDataSourceWebRequestModel
   */
  required: boolean;
  /**
   * The info about the data source
   * @type {CustomReportDataSourceInfoBaseEditWebModel}
   * @memberof EditDataSourceWebRequestModel
   */
  dataSourceInfo: CustomReportDataSourceInfoBaseEditWebModel;
  /**
   * The signature is used to ensure that the custom report being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same custom report
   * @type {string}
   * @memberof EditDataSourceWebRequestModel
   */
  signature: string;
}
