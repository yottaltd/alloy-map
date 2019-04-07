// tslint:disable
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
/**
 * Web request model to edit a job item
 * @export
 * @interface JobEditWebRequestModel
 */
export interface JobEditWebRequestModel {
  /**
   * Web request model for an item edit operation
   * @type {ItemEditWebRequestModel}
   * @memberof JobEditWebRequestModel
   */
  itemEditWebRequestModel: ItemEditWebRequestModel;
  /**
   * Optional parent links for edited job item. Key is the link attribute code, value is the list of parent item id that are linked via the attribute code. If parents already exist for given attribute code they will be removed and replaced with new values.
   * @type {{ [key: string]: Array<string>; }}
   * @memberof JobEditWebRequestModel
   */
  parents?: { [key: string]: Array<string>; };
  /**
   * When geometry is not set on the job edit model, this flag indicates whether to keep old geometry or update geometry to match new parent.
   * @type {boolean}
   * @memberof JobEditWebRequestModel
   */
  updateGeometryToMatchParent: boolean;
}
