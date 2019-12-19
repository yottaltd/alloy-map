// tslint:disable
import { AqsJsonNode } from './AqsJsonNode';
/**
 * Web request model for a Workflow manual run operation
 * @export
 * @interface CreateManualWorkflowRunWebRequestModel
 */
export interface CreateManualWorkflowRunWebRequestModel {
  /**
   * The query representing the items to trigger the workflow with
   * @type {AqsJsonNode}
   * @memberof CreateManualWorkflowRunWebRequestModel
   */
  query?: AqsJsonNode;
}
