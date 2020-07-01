import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
import { CustomReportDocumentDefinitionWebModelBase } from './CustomReportDocumentDefinitionWebModelBase';
import { CustomReportDocumentFlowVisualizationType } from './CustomReportDocumentFlowVisualizationType';
/**
 * 
 * @export
 * @interface CustomReportDocumentDefinitionFlowWebModel
 */
export interface CustomReportDocumentDefinitionFlowWebModel extends CustomReportDocumentDefinitionWebModelBase {
  /**
   * The list of controls that make up this custom report. The order in the array is the order in which they appear in the report
   * @type {Array<CustomReportControlFlowWebModelBase>}
   * @memberof CustomReportDocumentDefinitionFlowWebModel
   */
  controls: Array<CustomReportControlFlowWebModelBase>;
  /**
   * The array of visualizations to use for this document definition. For every visualization, a new report document will be created when the custom report is run
   * @type {Array<CustomReportDocumentFlowVisualizationType>}
   * @memberof CustomReportDocumentDefinitionFlowWebModel
   */
  visualizations: Array<CustomReportDocumentFlowVisualizationType>;
}
