import { CustomReportDocumentDefinitionInfoWebModelBase } from './CustomReportDocumentDefinitionInfoWebModelBase';
/**
 * Edit document definition web request model
 * @export
 * @interface EditDocumentDefinitionWebRequestModel
 */
export interface EditDocumentDefinitionWebRequestModel {
  /**
   * The name of the document definition
   * @type {string}
   * @memberof EditDocumentDefinitionWebRequestModel
   */
  name: string;
  /**
   * The controls in the order they should appear in this report document
   * @type {CustomReportDocumentDefinitionInfoWebModelBase}
   * @memberof EditDocumentDefinitionWebRequestModel
   */
  documentDefinitionInfo: CustomReportDocumentDefinitionInfoWebModelBase;
  /**
   * The signature is used to ensure that the custom report being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same custom report
   * @type {string}
   * @memberof EditDocumentDefinitionWebRequestModel
   */
  signature: string;
}
