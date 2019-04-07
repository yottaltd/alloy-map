// tslint:disable

/**
 * The web request model used to edit a layer
 * @export
 * @interface LayerEditWebRequestModel
 */
export interface LayerEditWebRequestModel {
  /**
   * The layer name
   * @type {string}
   * @memberof LayerEditWebRequestModel
   */
  name: string;
  /**
   * The layer tags
   * @type {Array<string>}
   * @memberof LayerEditWebRequestModel
   */
  tags?: Array<string>;
  /**
   * The signature is used to ensure that the layer being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same layer
   * @type {string}
   * @memberof LayerEditWebRequestModel
   */
  signature: string;
}
