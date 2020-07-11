import { AqsJsonNode } from './AqsJsonNode';
/**
 * Web model for a card query which is either an Aqs Query or an Aqs MathAggregation
 * @export
 * @interface CardQueryWebModel
 */
export interface CardQueryWebModel {
  /**
   * The card query Alloy Id
   * @type {string}
   * @memberof CardQueryWebModel
   */
  id: string;
  /**
   * The query name to display
   * @type {string}
   * @memberof CardQueryWebModel
   */
  name: string;
  /**
   * The AQS query to execute and display the result for in the card
   * @type {AqsJsonNode}
   * @memberof CardQueryWebModel
   */
  aqs: AqsJsonNode;
  /**
   * The value for this card query. Only available if the card has already been precomputed
   * @type {number}
   * @memberof CardQueryWebModel
   */
  value?: number;
}
