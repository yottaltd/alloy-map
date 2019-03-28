// tslint:disable

/**
 * The web request model used to delete a layer style
 * @export
 * @interface LayerStyleDeleteWebRequestModel
 */
export interface LayerStyleDeleteWebRequestModel {
  /**
   * The signature is used to ensure that the layer being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same layer
   * @type {string}
   * @memberof LayerStyleDeleteWebRequestModel
   */
  signature: string;
}
