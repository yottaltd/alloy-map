// tslint:disable

/**
 * Web model for a card query result
 * @export
 * @interface CardQueryResultWebModel
 */
export interface CardQueryResultWebModel {
  /**
   * The query name to display
   * @type {string}
   * @memberof CardQueryResultWebModel
   */
  name: string;
  /**
   * The AQS query to execute and display the result for in the card
   * @type {number}
   * @memberof CardQueryResultWebModel
   */
  value: number;
}
