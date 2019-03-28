// tslint:disable

/**
 * Web request model for a design attribute delete operation
 * @export
 * @interface DodiAttributeDeleteWebRequestModel
 */
export interface DodiAttributeDeleteWebRequestModel {
  /**
   * The signature is used to ensure that the design being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same design
   * @type {string}
   * @memberof DodiAttributeDeleteWebRequestModel
   */
  signature: string;
}
