import { CustomReportDocumentDefinitionInfoWebModelBase } from './CustomReportDocumentDefinitionInfoWebModelBase';
/**
 * Add document definition web request model
 * @export
 * @interface AddDocumentDefinitionWebRequestModel
 */
export interface AddDocumentDefinitionWebRequestModel {
  /**
   * The name of the document definition
   * @type {string}
   * @memberof AddDocumentDefinitionWebRequestModel
   */
  name: string;
  /**
   * The information specific to the document definition type
   * @type {CustomReportDocumentDefinitionInfoWebModelBase}
   * @memberof AddDocumentDefinitionWebRequestModel
   */
  documentDefinitionInfo: CustomReportDocumentDefinitionInfoWebModelBase;
  /**
   * The signature is used to ensure that the custom report being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same custom report
   * @type {string}
   * @memberof AddDocumentDefinitionWebRequestModel
   */
  signature: string;
}
