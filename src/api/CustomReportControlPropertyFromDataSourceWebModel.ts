// tslint:disable

/**
 * Web model for the custom report control dynamically defined properties
 * @export
 * @interface CustomReportControlPropertyFromDataSourceWebModel
 */
export interface CustomReportControlPropertyFromDataSourceWebModel {
  /**
   * The data source code the property should evaluate against
   * @type {string}
   * @memberof CustomReportControlPropertyFromDataSourceWebModel
   */
  dataSourceCode: string;
  /**
   * The column name in the datasource the property should evaluate against
   * @type {string}
   * @memberof CustomReportControlPropertyFromDataSourceWebModel
   */
  column: string;
}
