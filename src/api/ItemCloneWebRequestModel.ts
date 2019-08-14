// tslint:disable
import { CollectionCode } from './CollectionCode';
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
}
