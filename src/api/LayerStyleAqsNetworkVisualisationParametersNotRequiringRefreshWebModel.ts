import { LayerStyleLabelMode } from './LayerStyleLabelMode';
import { LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel } from './LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel';
/**
 * 
 * @export
 * @interface LayerStyleAqsNetworkVisualisationParametersNotRequiringRefreshWebModel
 */
export interface LayerStyleAqsNetworkVisualisationParametersNotRequiringRefreshWebModel extends LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel {
  /**
   * Weight
   * @type {number}
   * @memberof LayerStyleAqsNetworkVisualisationParametersNotRequiringRefreshWebModel
   */
  weight?: number;
  /**
   * Show icons
   * @type {boolean}
   * @memberof LayerStyleAqsNetworkVisualisationParametersNotRequiringRefreshWebModel
   */
  showIcons?: boolean;
  /**
   * Alpha
   * @type {number}
   * @memberof LayerStyleAqsNetworkVisualisationParametersNotRequiringRefreshWebModel
   */
  alpha?: number;
  /**
   * Label mode
   * @type {LayerStyleLabelMode}
   * @memberof LayerStyleAqsNetworkVisualisationParametersNotRequiringRefreshWebModel
   */
  labelMode?: LayerStyleLabelMode;
}
