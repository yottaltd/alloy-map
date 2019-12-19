// tslint:disable
import { CustomReportDocumentDefinitionWebModelBase } from './CustomReportDocumentDefinitionWebModelBase';
import { CustomReportWebModel } from './CustomReportWebModel';
/**
 * Add document definition web response model
 * @export
 * @interface AddDocumentDefinitionWebResponseModel
 */
export interface AddDocumentDefinitionWebResponseModel {
  /**
   * The custom report
   * @type {CustomReportWebModel}
   * @memberof AddDocumentDefinitionWebResponseModel
   */
  customReport: CustomReportWebModel;
  /**
   * The created document definition
   * @type {CustomReportDocumentDefinitionWebModelBase}
   * @memberof AddDocumentDefinitionWebResponseModel
   */
  addedDocumentDefinition: CustomReportDocumentDefinitionWebModelBase;
}
