// tslint:disable
import { Basemap } from './Basemap';
/**
 * Web model for basemap operation summary
 * @export
 * @interface BasemapOperationsSummaryWebModel
 */
export interface BasemapOperationsSummaryWebModel {
  /**
   * If true, the current user has permissions to edit this basemap
   * @type {boolean}
   * @memberof BasemapOperationsSummaryWebModel
   */
  canWrite: boolean;
  /**
   * If true, the current user has permissions to delete this basemap
   * @type {boolean}
   * @memberof BasemapOperationsSummaryWebModel
   */
  canDelete: boolean;
}
