// tslint:disable
import { CardQueryWebModel } from './CardQueryWebModel';
import { Context } from './Context';
import { MetadataWebModel } from './MetadataWebModel';
/**
 * Web model for a card
 * @export
 * @interface CardWebModel
 */
export interface CardWebModel {
  /**
   * The card name
   * @type {string}
   * @memberof CardWebModel
   */
  name: string;
  /**
   * The card Context
   * @type {Context}
   * @memberof CardWebModel
   */
  context: Context;
  /**
   * The card icon
   * @type {string}
   * @memberof CardWebModel
   */
  icon: string;
  /**
   * The unique card code
   * @type {string}
   * @memberof CardWebModel
   */
  code: string;
  /**
   * A list of design or design interface codes to give access to inside the card
   * @type {Array<string>}
   * @memberof CardWebModel
   */
  dodiCodes: Array<string>;
  /**
   * The queries to execute to populate the card data
   * @type {Array<CardQueryWebModel>}
   * @memberof CardWebModel
   */
  queries: Array<CardQueryWebModel>;
  /**
   * The metadata to a card
   * @type {MetadataWebModel}
   * @memberof CardWebModel
   */
  metadata: MetadataWebModel;
}
