// tslint:disable

/**
 * The web request model used to delete a card query
 * @export
 * @interface CardQueryDeleteWebRequestModel
 */
export interface CardQueryDeleteWebRequestModel {
  /**
   * The signature is used to ensure that the card being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same card
   * @type {string}
   * @memberof CardQueryDeleteWebRequestModel
   */
  signature: string;
}
