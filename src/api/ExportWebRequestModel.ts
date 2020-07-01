import { AqsJsonNode } from './AqsJsonNode';
/**
 * Web request model to start an export task
 * @export
 * @interface ExportWebRequestModel
 */
export interface ExportWebRequestModel {
  /**
   * The AqsJsonNode containing the Aqs query that generates the export data
   * @type {AqsJsonNode}
   * @memberof ExportWebRequestModel
   */
  aqs: AqsJsonNode;
  /**
   * The optional filename to use for the export.  If this isn't provided, the name is taken from the dodi specified in the aqs query
   * @type {string}
   * @memberof ExportWebRequestModel
   */
  fileName?: string;
  /**
   * Optionally export item geometry if supported by the design
   * @type {boolean}
   * @memberof ExportWebRequestModel
   */
  exportGeometry: boolean;
}
