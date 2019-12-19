// tslint:disable

/**
 * The web request model used to edit a custom report
 * @export
 * @interface CustomReportEditWebRequestModel
 */
export interface CustomReportEditWebRequestModel {
  /**
   * The list of controls that make up this custom report. The order in the array is the order in which they appear in the report
   * @type {string}
   * @memberof CustomReportEditWebRequestModel
   */
  name: string;
  /**
   * The signature is used to ensure that the custom report being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same custom report
   * @type {string}
   * @memberof CustomReportEditWebRequestModel
   */
  signature: string;
}
