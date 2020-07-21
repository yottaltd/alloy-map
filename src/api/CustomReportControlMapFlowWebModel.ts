import { BoundingBoxWebModel } from './BoundingBoxWebModel';
import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
import { CustomReportControlPropertyWebModelOfBoundingBoxWebModel } from './CustomReportControlPropertyWebModelOfBoundingBoxWebModel';
/**
 * 
 * @export
 * @interface CustomReportControlMapFlowWebModel
 */
export interface CustomReportControlMapFlowWebModel extends CustomReportControlFlowWebModelBase {
  /**
   * The Guc of the data source the map items have to be read from
   * @type {string}
   * @memberof CustomReportControlMapFlowWebModel
   */
  dataSourceCode?: string;
  /**
   * The colour of the item on the map
   * @type {string}
   * @memberof CustomReportControlMapFlowWebModel
   */
  colourColumnId?: string;
  /**
   * The icon of the item on the map
   * @type {string}
   * @memberof CustomReportControlMapFlowWebModel
   */
  iconColumnId?: string;
  /**
   * The geometry of the item on the map
   * @type {string}
   * @memberof CustomReportControlMapFlowWebModel
   */
  geometryColumnId?: string;
  /**
   * The map will be restricted to this bounding box. Moreover, for an Aqs map component, it will act as an additional condition to the provided Aqs query
   * @type {CustomReportControlPropertyWebModelOfBoundingBoxWebModel}
   * @memberof CustomReportControlMapFlowWebModel
   */
  boundingBox?: CustomReportControlPropertyWebModelOfBoundingBoxWebModel;
}
