// tslint:disable
import { ExtendedBulkApiRequestBase } from './ExtendedBulkApiRequestBase';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { ExtendedBulkApi } from './ExtendedBulkApi';
/**
 * Web request model to edit a item
 * @export
 * @interface ExtendedBulkEditWebRequestModel
 */
export interface ExtendedBulkEditWebRequestModel extends ExtendedBulkApiRequestBase {
  /**
   * Web request model for an item edit operation
   * @type {ItemEditWebRequestModel}
   * @memberof ExtendedBulkEditWebRequestModel
   */
  itemEditWebRequestModel: ItemEditWebRequestModel;
  /**
   * Optional parent links for edited item. Key is the link attribute code, value is the list of parent item id that are linked via the attribute code. Any existing special parents (asset, inspection, job or defect) will be replaced with new special parent. All other parents are just added to the item.
   * @type {{ [key: string]: Array<string>; }}
   * @memberof ExtendedBulkEditWebRequestModel
   */
  parents?: { [key: string]: Array<string>; };
  /**
   * When geometry is not set on the edit model, this flag indicates whether to keep old geometry or update geometry to match new parent.
   * @type {boolean}
   * @memberof ExtendedBulkEditWebRequestModel
   */
  updateGeometryToMatchParent: boolean;
  /**
   * The AId of the item to edit
   * @type {string}
   * @memberof ExtendedBulkEditWebRequestModel
   */
  editItemId: string;
}
