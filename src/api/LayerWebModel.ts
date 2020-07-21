import { Context } from './Context';
import { LayerStyleWebModel } from './LayerStyleWebModel';
import { LayerVisualisationType } from './LayerVisualisationType';
import { MetadataWebModel } from './MetadataWebModel';
/**
 * Web model for a layer
 * @export
 * @interface LayerWebModel
 */
export interface LayerWebModel {
  /**
   * The layer name
   * @type {string}
   * @memberof LayerWebModel
   */
  name: string;
  /**
   * The layer Guc
   * @type {string}
   * @memberof LayerWebModel
   */
  code: string;
  /**
   * The Context of the layer
   * @type {Context}
   * @memberof LayerWebModel
   */
  context: Context;
  /**
   * The styles within the layer
   * @type {Array<LayerStyleWebModel>}
   * @memberof LayerWebModel
   */
  styles: Array<LayerStyleWebModel>;
  /**
   * The tags associated to this layer
   * @type {Array<string>}
   * @memberof LayerWebModel
   */
  tags?: Array<string>;
  /**
   * The visualisations associated to this layer
   * @type {Array<LayerVisualisationType>}
   * @memberof LayerWebModel
   */
  visualisations: Array<LayerVisualisationType>;
  /**
   * Layer is disabled or not
   * @type {boolean}
   * @memberof LayerWebModel
   */
  disabled: boolean;
  /**
   * The metadata of a layer
   * @type {MetadataWebModel}
   * @memberof LayerWebModel
   */
  metadata: MetadataWebModel;
}
