import { CollectionCode } from './CollectionCode';
import { ContainerWebModelOfCollectionCode } from './ContainerWebModelOfCollectionCode';
import { ContainerWebModelOfDateTime } from './ContainerWebModelOfDateTime';
import { ContainerWebModelOfString } from './ContainerWebModelOfString';
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
/**
 * Web model for an item delta
 * @export
 * @interface ItemVersionDeltaWebModel
 */
export interface ItemVersionDeltaWebModel {
  /**
   * Any attributes that were changed
   * @type {Array<ItemAttributeWebModel>}
   * @memberof ItemVersionDeltaWebModel
   */
  attributes?: Array<ItemAttributeWebModel>;
  /**
   * The collection, if it was changed
   * @type {ContainerWebModelOfCollectionCode}
   * @memberof ItemVersionDeltaWebModel
   */
  collection?: ContainerWebModelOfCollectionCode;
  /**
   * The start date, if it was changed
   * @type {ContainerWebModelOfDateTime}
   * @memberof ItemVersionDeltaWebModel
   */
  start?: ContainerWebModelOfDateTime;
  /**
   * The end date, if it was changed
   * @type {ContainerWebModelOfDateTime}
   * @memberof ItemVersionDeltaWebModel
   */
  end?: ContainerWebModelOfDateTime;
  /**
   * The icon, if it was changed
   * @type {ContainerWebModelOfString}
   * @memberof ItemVersionDeltaWebModel
   */
  icon?: ContainerWebModelOfString;
  /**
   * The colour, if it was changed
   * @type {ContainerWebModelOfString}
   * @memberof ItemVersionDeltaWebModel
   */
  colour?: ContainerWebModelOfString;
  /**
   * The signature
   * @type {string}
   * @memberof ItemVersionDeltaWebModel
   */
  signature: string;
}
