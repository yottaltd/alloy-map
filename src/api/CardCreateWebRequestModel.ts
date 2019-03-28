// tslint:disable

/**
 * Web request model to create a card
 * @export
 * @interface CardCreateWebRequestModel
 */
export interface CardCreateWebRequestModel {
  /**
   * The name of the card
   * @type {string}
   * @memberof CardCreateWebRequestModel
   */
  name: string;
  /**
   * The card icon
   * @type {string}
   * @memberof CardCreateWebRequestModel
   */
  icon: string;
  /**
   * The cache interval in seconds, i.e. the amount of time the card should be cached for before being refreshed
   * @type {number}
   * @memberof CardCreateWebRequestModel
   */
  cacheInterval: number;
  /**
   * The dodi codes related to the card
   * @type {Array<string>}
   * @memberof CardCreateWebRequestModel
   */
  dodiCodes: Array<string>;
}
