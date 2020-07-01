
/**
 * Web request model for an item log query operation
 * @export
 * @interface ItemLogQueryWebRequestModel
 */
export interface ItemLogQueryWebRequestModel {
  /**
   * The point in audit time to query
   * @type {string}
   * @memberof ItemLogQueryWebRequestModel
   */
  date: string;
}
