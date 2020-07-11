import { BasemapAllowedAction } from './BasemapAllowedAction';
import { BasemapWebModelBase } from './BasemapWebModelBase';
/**
 * Web model for a basemap access advisor
 * @export
 * @interface BasemapAccessAdvisorWebModel
 */
export interface BasemapAccessAdvisorWebModel {
  /**
   * The retrieved basemap
   * @type {BasemapWebModelBase}
   * @memberof BasemapAccessAdvisorWebModel
   */
  basemap: BasemapWebModelBase;
  /**
   * The winning permissions that users have on this basemap (for all user groups they belong to)
   * @type {BasemapAllowedAction}
   * @memberof BasemapAccessAdvisorWebModel
   */
  winningPermission: BasemapAllowedAction;
}
