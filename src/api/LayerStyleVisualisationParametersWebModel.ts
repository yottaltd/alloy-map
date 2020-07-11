import { LayerVisualisationType } from './LayerVisualisationType';
import { LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel } from './LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel';
import { LayerStyleVisualisationParametersRequiringRefreshBaseWebModel } from './LayerStyleVisualisationParametersRequiringRefreshBaseWebModel';
/**
 * Layer Style visualisation parameters web model
 * @export
 * @interface LayerStyleVisualisationParametersWebModel
 */
export interface LayerStyleVisualisationParametersWebModel {
  /**
   * Type of visualisation
   * @type {LayerVisualisationType}
   * @memberof LayerStyleVisualisationParametersWebModel
   */
  visualisation: LayerVisualisationType;
  /**
   * Parameters requiring refresh
   * @type {LayerStyleVisualisationParametersRequiringRefreshBaseWebModel}
   * @memberof LayerStyleVisualisationParametersWebModel
   */
  parametersRequiringRefresh?: LayerStyleVisualisationParametersRequiringRefreshBaseWebModel;
  /**
   * Parameters not requiring refresh
   * @type {LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel}
   * @memberof LayerStyleVisualisationParametersWebModel
   */
  parametersNotRequiringRefresh?: LayerStyleVisualisationParametersNotRequiringRefreshBaseWebModel;
}
