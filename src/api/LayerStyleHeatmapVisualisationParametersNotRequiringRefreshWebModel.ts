import { LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel } from './LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel';
/**
 * 
 * @export
 * @interface LayerStyleHeatmapVisualisationParametersNotRequiringRefreshWebModel
 */
export interface LayerStyleHeatmapVisualisationParametersNotRequiringRefreshWebModel extends LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel {
  /**
   * Weight property
   * @type {string}
   * @memberof LayerStyleHeatmapVisualisationParametersNotRequiringRefreshWebModel
   */
  weightProperty?: string;
  /**
   * Gradient
   * @type {Array<string>}
   * @memberof LayerStyleHeatmapVisualisationParametersNotRequiringRefreshWebModel
   */
  gradient?: Array<string>;
  /**
   * Blur
   * @type {number}
   * @memberof LayerStyleHeatmapVisualisationParametersNotRequiringRefreshWebModel
   */
  blur?: number;
  /**
   * Radius
   * @type {number}
   * @memberof LayerStyleHeatmapVisualisationParametersNotRequiringRefreshWebModel
   */
  radius?: number;
}
