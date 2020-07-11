import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
import { CustomReportDocumentDefinitionInfoWebModelBase } from './CustomReportDocumentDefinitionInfoWebModelBase';
import { CustomReportDocumentFlowVisualizationType } from './CustomReportDocumentFlowVisualizationType';
/**
 * 
 * @export
 * @interface CustomReportDocumentDefinitionInfoFlowWebModel
 */
export interface CustomReportDocumentDefinitionInfoFlowWebModel extends CustomReportDocumentDefinitionInfoWebModelBase {
  /**
   * The list of controls that make up this custom report. The order in the array is the order in which they appear in the report
   * @type {Array<CustomReportControlFlowWebModelBase>}
   * @memberof CustomReportDocumentDefinitionInfoFlowWebModel
   */
  controls: Array<CustomReportControlFlowWebModelBase>;
  /**
   * The array of visualizations to use for this document definition. For every visualization, a new report document will be created when the custom report is run
   * @type {Array<CustomReportDocumentFlowVisualizationType>}
   * @memberof CustomReportDocumentDefinitionInfoFlowWebModel
   */
  visualizations: Array<CustomReportDocumentFlowVisualizationType>;
}
