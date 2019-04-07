// tslint:disable
import { CollectionCode } from './CollectionCode';
import { IGeometryObject } from './IGeometryObject';
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
/**
 * 
 * @export
 * @interface ItemWebModel
 */
export interface ItemWebModel {
  /**
   * 
   * @type {string}
   * @memberof ItemWebModel
   */
  itemId: string;
  /**
   * 
   * @type {string}
   * @memberof ItemWebModel
   */
  designCode: string;
  /**
   * 
   * @type {CollectionCode}
   * @memberof ItemWebModel
   */
  collection: CollectionCode;
  /**
   * 
   * @type {string}
   * @memberof ItemWebModel
   */
  start: string;
  /**
   * 
   * @type {string}
   * @memberof ItemWebModel
   */
  end: string;
  /**
   * 
   * @type {IGeometryObject}
   * @memberof ItemWebModel
   */
  geometry?: IGeometryObject;
  /**
   * 
   * @type {string}
   * @memberof ItemWebModel
   */
  icon: string;
  /**
   * 
   * @type {string}
   * @memberof ItemWebModel
   */
  colour: string;
  /**
   * 
   * @type {Array<ItemAttributeWebModel>}
   * @memberof ItemWebModel
   */
  attributes: Array<ItemAttributeWebModel>;
  /**
   * 
   * @type {string}
   * @memberof ItemWebModel
   */
  signature: string;
  /**
   * 
   * @type {string}
   * @memberof ItemWebModel
   */
  title: string;
  /**
   * 
   * @type {string}
   * @memberof ItemWebModel
   */
  subtitle: string;
}
