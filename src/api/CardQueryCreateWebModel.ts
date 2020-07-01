import { AqsJsonNode } from './AqsJsonNode';
/**
 * Web request model for a card query create operation
 * @export
 * @interface CardQueryCreateWebModel
 */
export interface CardQueryCreateWebModel {
  /**
   * The query name to display
   * @type {string}
   * @memberof CardQueryCreateWebModel
   */
  name: string;
  /**
   * The AQS query to execute and display the result for in the card
   * @type {AqsJsonNode}
   * @memberof CardQueryCreateWebModel
   */
  aqs: AqsJsonNode;
  /**
   * The signature is used to ensure that the card being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same card
   * @type {string}
   * @memberof CardQueryCreateWebModel
   */
  signature: string;
}
