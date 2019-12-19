// tslint:disable

/**
 * Remove data source web request model
 * @export
 * @interface RemoveDataSourceWebRequestModel
 */
export interface RemoveDataSourceWebRequestModel {
  /**
   * The signature is used to ensure that the custom report being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same custom report
   * @type {string}
   * @memberof RemoveDataSourceWebRequestModel
   */
  signature: string;
}
