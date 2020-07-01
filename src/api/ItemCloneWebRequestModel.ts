import { CloneCascadeMode } from './CloneCascadeMode';
import { CloneReparentMode } from './CloneReparentMode';
import { CollectionCode } from './CollectionCode';
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
import { ItemCloneModeWebModelOfCloneCascadeMode } from './ItemCloneModeWebModelOfCloneCascadeMode';
import { ItemCloneModeWebModelOfCloneReparentMode } from './ItemCloneModeWebModelOfCloneReparentMode';
/**
 * Web request model for an item clone operation
 * @export
 * @interface ItemCloneWebRequestModel
 */
export interface ItemCloneWebRequestModel {
  /**
   * The Collection to which this item belongs to
   * @type {CollectionCode}
   * @memberof ItemCloneWebRequestModel
   */
  collection: CollectionCode;
  /**
   * The items which will act as parents for the cloned item Key is the link attribute code, value is the list of parent item id which are linked via the attribute code
   * @type {{ [key: string]: Array<string>; }}
   * @memberof ItemCloneWebRequestModel
   */
  parents?: { [key: string]: Array<string>; };
  /**
   * The item attributes to set on the cloned item
   * @type {Array<ItemAttributeWebModel>}
   * @memberof ItemCloneWebRequestModel
   */
  attributes?: Array<ItemAttributeWebModel>;
  /**
   * Cascade modes per graph code to use when cloning child items. If the same graph code is specified more than once, only the last entry will be used
   * @type {Array<ItemCloneModeWebModelOfCloneCascadeMode>}
   * @memberof ItemCloneWebRequestModel
   */
  cascadeModes?: Array<ItemCloneModeWebModelOfCloneCascadeMode>;
  /**
   * Reparent modes per graph code to use when linking cloned items back to original parents. If the same graph code is specified more than once, only the last entry will be used
   * @type {Array<ItemCloneModeWebModelOfCloneReparentMode>}
   * @memberof ItemCloneWebRequestModel
   */
  reparentModes?: Array<ItemCloneModeWebModelOfCloneReparentMode>;
}
