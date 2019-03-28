// tslint:disable

/**
 * Web request model to reorder the styles on a layer
 * @export
 * @interface LayerReorderStylesWebRequestModel
 */
export interface LayerReorderStylesWebRequestModel {
  /**
   * The style ids in their new order. All existing styles need to be provided
   * @type {Array<string>}
   * @memberof LayerReorderStylesWebRequestModel
   */
  styleIds: Array<string>;
  /**
   * The signature is used to ensure that the layer being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same layer
   * @type {string}
   * @memberof LayerReorderStylesWebRequestModel
   */
  signature: string;
}
