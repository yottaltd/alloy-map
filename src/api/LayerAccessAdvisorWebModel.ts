import { LayerAllowedAction } from './LayerAllowedAction';
import { LayerWebModel } from './LayerWebModel';
/**
 * Web model for a layer access advisor
 * @export
 * @interface LayerAccessAdvisorWebModel
 */
export interface LayerAccessAdvisorWebModel {
  /**
   * The retrieved layer
   * @type {LayerWebModel}
   * @memberof LayerAccessAdvisorWebModel
   */
  layer: LayerWebModel;
  /**
   * The winning permissions that users have on this layer (for all user groups they belong to)
   * @type {LayerAllowedAction}
   * @memberof LayerAccessAdvisorWebModel
   */
  winningPermission: LayerAllowedAction;
}
