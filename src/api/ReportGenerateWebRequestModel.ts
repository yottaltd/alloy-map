// tslint:disable
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
/**
 * Web request model for report list operation
 * @export
 * @interface ReportGenerateWebRequestModel
 */
export interface ReportGenerateWebRequestModel {
  /**
   * Guc to filter report designs by.
   * @type {ItemCreateWebRequestModel}
   * @memberof ReportGenerateWebRequestModel
   */
  reportItemModel: ItemCreateWebRequestModel;
}
