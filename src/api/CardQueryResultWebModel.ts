
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
   * The value of the query result
   * @type {number}
   * @memberof CardQueryResultWebModel
   */
  value?: number;
}
