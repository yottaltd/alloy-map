// tslint:disable

/**
 * The web request model used to edit a card
 * @export
 * @interface CardEditWebRequestModel
 */
export interface CardEditWebRequestModel {
  /**
   * The card name
   * @type {string}
   * @memberof CardEditWebRequestModel
   */
  name: string;
  /**
   * The card icon
   * @type {string}
   * @memberof CardEditWebRequestModel
   */
  icon: string;
  /**
   * The cache interval in seconds, i.e. the amount of time the card should be cached for before being refreshed
   * @type {number}
   * @memberof CardEditWebRequestModel
   */
  cacheInterval: number;
  /**
   * The dodi codes related to the card
   * @type {Array<string>}
   * @memberof CardEditWebRequestModel
   */
  dodiCodes: Array<string>;
  /**
   * The signature is used to ensure that the card being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same card
   * @type {string}
   * @memberof CardEditWebRequestModel
   */
  signature: string;
}
