// tslint:disable
import { CollectionCode } from './CollectionCode';
import { IGeometryObject } from './IGeometryObject';
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
/**
 * 
 * @export
 * @interface ItemCreateWebRequestModel
 */
export interface ItemCreateWebRequestModel {
  /**
   * 
   * @type {string}
   * @memberof ItemCreateWebRequestModel
   */
  designCode: string;
  /**
   * 
   * @type {CollectionCode}
   * @memberof ItemCreateWebRequestModel
   */
  collection: CollectionCode;
  /**
   * 
   * @type {IGeometryObject}
   * @memberof ItemCreateWebRequestModel
   */
  geometry?: IGeometryObject;
  /**
   * 
   * @type {string}
   * @memberof ItemCreateWebRequestModel
   */
  icon?: string;
  /**
   * 
   * @type {string}
   * @memberof ItemCreateWebRequestModel
   */
  colour?: string;
  /**
   * 
   * @type {Array<ItemAttributeWebModel>}
   * @memberof ItemCreateWebRequestModel
   */
  attributes?: Array<ItemAttributeWebModel>;
  /**
   * 
   * @type {{ [key: string]: Array<string>; }}
   * @memberof ItemCreateWebRequestModel
   */
  parents?: { [key: string]: Array<string>; };
}
