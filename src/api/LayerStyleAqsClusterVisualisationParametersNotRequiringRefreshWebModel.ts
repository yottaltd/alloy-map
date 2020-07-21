import { LayerStyleLabelMode } from './LayerStyleLabelMode';
import { LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel } from './LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel';
/**
 * 
 * @export
 * @interface LayerStyleAqsClusterVisualisationParametersNotRequiringRefreshWebModel
 */
export interface LayerStyleAqsClusterVisualisationParametersNotRequiringRefreshWebModel extends LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel {
  /**
   * Weight
   * @type {number}
   * @memberof LayerStyleAqsClusterVisualisationParametersNotRequiringRefreshWebModel
   */
  weight?: number;
  /**
   * Show icons
   * @type {boolean}
   * @memberof LayerStyleAqsClusterVisualisationParametersNotRequiringRefreshWebModel
   */
  showIcons?: boolean;
  /**
   * Alpha
   * @type {number}
   * @memberof LayerStyleAqsClusterVisualisationParametersNotRequiringRefreshWebModel
   */
  alpha?: number;
  /**
   * Label mode
   * @type {LayerStyleLabelMode}
   * @memberof LayerStyleAqsClusterVisualisationParametersNotRequiringRefreshWebModel
   */
  labelMode?: LayerStyleLabelMode;
}
