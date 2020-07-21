import { LayerStyleCreateWebModel } from './LayerStyleCreateWebModel';
import { LayerVisualisationType } from './LayerVisualisationType';
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
   * The layer styles to have on the layer upon creation
   * @type {Array<LayerStyleCreateWebModel>}
   * @memberof LayerCreateWebRequestModel
   */
  layerStyles?: Array<LayerStyleCreateWebModel>;
  /**
   * The layer tags
   * @type {Array<string>}
   * @memberof LayerCreateWebRequestModel
   */
  tags?: Array<string>;
  /**
   * The visualisations to have on the layer upon creation
   * @type {Array<LayerVisualisationType>}
   * @memberof LayerCreateWebRequestModel
   */
  layerVisualisations?: Array<LayerVisualisationType>;
  /**
   * Layer is disabled or not
   * @type {boolean}
   * @memberof LayerCreateWebRequestModel
   */
  disabled?: boolean;
}
