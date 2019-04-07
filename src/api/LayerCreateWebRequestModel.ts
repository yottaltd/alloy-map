// tslint:disable

/**
 * Web request model to create a layer
 * @export
 * @interface LayerCreateWebRequestModel
 */
export interface LayerCreateWebRequestModel {
  /**
   * The name of the layer
   * @type {string}
   * @memberof LayerCreateWebRequestModel
   */
  name: string;
  /**
   * The layer tags
   * @type {Array<string>}
   * @memberof LayerCreateWebRequestModel
   */
  tags?: Array<string>;
}
