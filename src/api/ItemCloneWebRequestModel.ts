// tslint:disable
import { CloneCascadeMode } from './CloneCascadeMode';
import { CloneReparentMode } from './CloneReparentMode';
import { CollectionCode } from './CollectionCode';
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
import { ItemCloneModeWebModelOfCloneCascadeMode } from './ItemCloneModeWebModelOfCloneCascadeMode';
import { ItemCloneModeWebModelOfCloneReparentMode } from './ItemCloneModeWebModelOfCloneReparentMode';
/**
 * 
 * @export
 * @interface ItemCloneWebRequestModel
 */
export interface ItemCloneWebRequestModel {
  /**
   * 
   * @type {CollectionCode}
   * @memberof ItemCloneWebRequestModel
   */
  collection: CollectionCode;
  /**
   * 
   * @type {{ [key: string]: Array<string>; }}
   * @memberof ItemCloneWebRequestModel
   */
  parents?: { [key: string]: Array<string>; };
  /**
   * 
   * @type {Array<ItemAttributeWebModel>}
   * @memberof ItemCloneWebRequestModel
   */
  attributes?: Array<ItemAttributeWebModel>;
  /**
   * 
   * @type {Array<ItemCloneModeWebModelOfCloneCascadeMode>}
   * @memberof ItemCloneWebRequestModel
   */
  cascadeModes?: Array<ItemCloneModeWebModelOfCloneCascadeMode>;
  /**
   * 
   * @type {Array<ItemCloneModeWebModelOfCloneReparentMode>}
   * @memberof ItemCloneWebRequestModel
   */
  reparentModes?: Array<ItemCloneModeWebModelOfCloneReparentMode>;
}
