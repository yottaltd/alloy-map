
/**
 * Web request model to remove the specified dodi codes to the filter design
 * @export
 * @interface ApplicableDodisRemoveWebRequestModel
 */
export interface ApplicableDodisRemoveWebRequestModel {
  /**
   * The Guc of dodis to be removed from the filter
   * @type {Array<string>}
   * @memberof ApplicableDodisRemoveWebRequestModel
   */
  dodiCodes: Array<string>;
}
