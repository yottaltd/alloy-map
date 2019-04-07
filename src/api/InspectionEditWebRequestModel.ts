// tslint:disable
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
/**
 * Web request model to edit an inspection item
 * @export
 * @interface InspectionEditWebRequestModel
 */
export interface InspectionEditWebRequestModel {
  /**
   * Web request model for an item edit operation
   * @type {ItemEditWebRequestModel}
   * @memberof InspectionEditWebRequestModel
   */
  itemEditWebRequestModel: ItemEditWebRequestModel;
  /**
   * Optional parent links for edited inspection item. Key is the link attribute code, value is the list of parent item id that are linked via the attribute code. If parents already exist for given attribute code they will be removed and replaced with new values.
   * @type {{ [key: string]: Array<string>; }}
   * @memberof InspectionEditWebRequestModel
   */
  parents?: { [key: string]: Array<string>; };
  /**
   * When geometry is not set on the inspection edit model, this flag indicates whether to keep old geometry or update geometry to match new parent.
   * @type {boolean}
   * @memberof InspectionEditWebRequestModel
   */
  updateGeometryToMatchParent: boolean;
}
