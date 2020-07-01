
/**
 * Web request model to request applicable jobs/inspections/defects for item designs
 * @export
 * @interface ItemDesignsForFilterWebRequestModel
 */
export interface ItemDesignsForFilterWebRequestModel {
  /**
   * The Guc of the designs to filter by
   * @type {Array<string>}
   * @memberof ItemDesignsForFilterWebRequestModel
   */
  designCodes: Array<string>;
}
