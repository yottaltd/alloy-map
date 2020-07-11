import { LayerStyleEditWebModel } from './LayerStyleEditWebModel';
import { LayerVisualisationType } from './LayerVisualisationType';
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
   * The layer style that will replace any previous styles on this layer
   * @type {Array<LayerStyleEditWebModel>}
   * @memberof LayerEditWebRequestModel
   */
  layerStyles: Array<LayerStyleEditWebModel>;
  /**
   * The layer visualisations
   * @type {Array<LayerVisualisationType>}
   * @memberof LayerEditWebRequestModel
   */
  layerVisualisations?: Array<LayerVisualisationType>;
  /**
   * Layer is disabled or not
   * @type {boolean}
   * @memberof LayerEditWebRequestModel
   */
  disabled: boolean;
  /**
   * The signature is used to ensure that the layer being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same layer
   * @type {string}
   * @memberof LayerEditWebRequestModel
   */
  signature: string;
}
