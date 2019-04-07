// tslint:disable
import { CollectionCode } from './CollectionCode';
import { IGeometryObject } from './IGeometryObject';
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
/**
 * 
 * @export
 * @interface ItemEditWebRequestModel
 */
export interface ItemEditWebRequestModel {
  /**
   * 
   * @type {CollectionCode}
   * @memberof ItemEditWebRequestModel
   */
  collection: CollectionCode;
  /**
   * 
   * @type {IGeometryObject}
   * @memberof ItemEditWebRequestModel
   */
  geometry?: IGeometryObject;
  /**
   * 
   * @type {string}
   * @memberof ItemEditWebRequestModel
   */
  icon?: string;
  /**
   * 
   * @type {string}
   * @memberof ItemEditWebRequestModel
   */
  colour?: string;
  /**
   * 
   * @type {Array<ItemAttributeWebModel>}
   * @memberof ItemEditWebRequestModel
   */
  attributes?: Array<ItemAttributeWebModel>;
  /**
   * 
   * @type {string}
   * @memberof ItemEditWebRequestModel
   */
  signature: string;
}
