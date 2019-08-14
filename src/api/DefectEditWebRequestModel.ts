// tslint:disable
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
/**
 * Web request model to edit a defect item
 * @export
 * @interface DefectEditWebRequestModel
 */
export interface DefectEditWebRequestModel {
  /**
   * Web request model for an item edit operation
   * @type {ItemEditWebRequestModel}
   * @memberof DefectEditWebRequestModel
   */
  itemEditWebRequestModel: ItemEditWebRequestModel;
  /**
   * Optional parent links for edited defect item. Key is the link attribute code, value is the list of parent item id that are linked via the attribute code. Any existing special parents (asset, inspection, job or related defect) will be replaced with new special parent. All other parents are just added to the item.
   * @type {{ [key: string]: Array<string>; }}
   * @memberof DefectEditWebRequestModel
   */
  parents?: { [key: string]: Array<string>; };
  /**
   * When geometry is not set on the defect edit model, this flag indicates whether to keep old geometry or update geometry to match new parent.
   * @type {boolean}
   * @memberof DefectEditWebRequestModel
   */
  updateGeometryToMatchParent: boolean;
}
