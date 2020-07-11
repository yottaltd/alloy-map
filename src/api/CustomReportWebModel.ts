import { CustomReportDataSourceWebModel } from './CustomReportDataSourceWebModel';
import { CustomReportDocumentDefinitionWebModelBase } from './CustomReportDocumentDefinitionWebModelBase';
import { MetadataWebModel } from './MetadataWebModel';
/**
 * Web model for a card
 * @export
 * @interface CustomReportWebModel
 */
export interface CustomReportWebModel {
  /**
   * The unique custom report code
   * @type {string}
   * @memberof CustomReportWebModel
   */
  code: string;
  /**
   * The custom report name
   * @type {string}
   * @memberof CustomReportWebModel
   */
  name: string;
  /**
   * The data sources that are part of this custom report. Data sources work like report input parameters and they are the entity that provides data to fill the report controls properties
   * @type {Array<CustomReportDataSourceWebModel>}
   * @memberof CustomReportWebModel
   */
  dataSources: Array<CustomReportDataSourceWebModel>;
  /**
   * The document definitions that this custom report contains. When the report is run, a report document will be generated for each document definition
   * @type {Array<CustomReportDocumentDefinitionWebModelBase>}
   * @memberof CustomReportWebModel
   */
  documents: Array<CustomReportDocumentDefinitionWebModelBase>;
  /**
   * The metadata to a card
   * @type {MetadataWebModel}
   * @memberof CustomReportWebModel
   */
  metadata: MetadataWebModel;
}
