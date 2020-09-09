import { CustomReportControlTabularWebModelBase } from './CustomReportControlTabularWebModelBase';
import { CustomReportDocumentDefinitionInfoWebModelBase } from './CustomReportDocumentDefinitionInfoWebModelBase';
import { CustomReportDocumentTabularVisualizationType } from './CustomReportDocumentTabularVisualizationType';
/**
 * 
 * @export
 * @interface CustomReportDocumentDefinitionInfoTabularWebModel
 */
export interface CustomReportDocumentDefinitionInfoTabularWebModel extends CustomReportDocumentDefinitionInfoWebModelBase {
  /**
   * The list of controls that make up this custom report. The order in the array is the order in which they appear in the report
   * @type {Array<CustomReportControlTabularWebModelBase>}
   * @memberof CustomReportDocumentDefinitionInfoTabularWebModel
   */
  controls: Array<CustomReportControlTabularWebModelBase>;
  /**
   * The array of visualizations to use for this document definition. For every visualization, a new report document will be created when the custom report is run
   * @type {Array<CustomReportDocumentTabularVisualizationType>}
   * @memberof CustomReportDocumentDefinitionInfoTabularWebModel
   */
  visualizations: Array<CustomReportDocumentTabularVisualizationType>;
}
