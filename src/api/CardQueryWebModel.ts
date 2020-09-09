import { AlloyExceptionWebModel } from './AlloyExceptionWebModel';
import { AqsJsonNode } from './AqsJsonNode';
import { CardQueryValidity } from './CardQueryValidity';
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
  /**
   * It gives an indication of the query validity. If invalid, it tells whether it is a case it is possible recover from or not
   * @type {CardQueryValidity}
   * @memberof CardQueryWebModel
   */
  validity: CardQueryValidity;
  /**
   * If the query is invalid, it explains what error made it invalid
   * @type {AlloyExceptionWebModel}
   * @memberof CardQueryWebModel
   */
  error?: AlloyExceptionWebModel;
}
