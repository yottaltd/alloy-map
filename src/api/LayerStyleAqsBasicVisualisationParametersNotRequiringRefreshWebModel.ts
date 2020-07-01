import { LayerStyleLabelMode } from './LayerStyleLabelMode';
import { LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel } from './LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel';
/**
 * 
 * @export
 * @interface LayerStyleAqsBasicVisualisationParametersNotRequiringRefreshWebModel
 */
export interface LayerStyleAqsBasicVisualisationParametersNotRequiringRefreshWebModel extends LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel {
  /**
   * Weight
   * @type {number}
   * @memberof LayerStyleAqsBasicVisualisationParametersNotRequiringRefreshWebModel
   */
  weight?: number;
  /**
   * Show icons
   * @type {boolean}
   * @memberof LayerStyleAqsBasicVisualisationParametersNotRequiringRefreshWebModel
   */
  showIcons?: boolean;
  /**
   * Alpha
   * @type {number}
   * @memberof LayerStyleAqsBasicVisualisationParametersNotRequiringRefreshWebModel
   */
  alpha?: number;
  /**
   * Label mode
   * @type {LayerStyleLabelMode}
   * @memberof LayerStyleAqsBasicVisualisationParametersNotRequiringRefreshWebModel
   */
  labelMode?: LayerStyleLabelMode;
}
