import { CardQueryResultWebModel } from './CardQueryResultWebModel';
/**
 * Web model for a computed card which contains all the results of the card queries
 * @export
 * @interface CardComputedWebModel
 */
export interface CardComputedWebModel {
  /**
   * The card name
   * @type {string}
   * @memberof CardComputedWebModel
   */
  name: string;
  /**
   * The unique card code
   * @type {string}
   * @memberof CardComputedWebModel
   */
  code: string;
  /**
   * A list of design or design interface codes to give access to inside the card
   * @type {Array<string>}
   * @memberof CardComputedWebModel
   */
  dodiCodes: Array<string>;
  /**
   * The queries to execute to populate the card data
   * @type {Array<CardQueryResultWebModel>}
   * @memberof CardComputedWebModel
   */
  results: Array<CardQueryResultWebModel>;
}
