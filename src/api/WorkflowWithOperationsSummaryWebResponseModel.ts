import { WorkflowOperationsSummaryWebModel } from './WorkflowOperationsSummaryWebModel';
import { WorkflowWebModel } from './WorkflowWebModel';
/**
 * Web model for a Workflow
 * @export
 * @interface WorkflowWithOperationsSummaryWebResponseModel
 */
export interface WorkflowWithOperationsSummaryWebResponseModel {
  /**
   * The Workflow returned as a result
   * @type {WorkflowWebModel}
   * @memberof WorkflowWithOperationsSummaryWebResponseModel
   */
  workflow: WorkflowWebModel;
  /**
   * The summary of the UAC operations allowed for this Workflow
   * @type {WorkflowOperationsSummaryWebModel}
   * @memberof WorkflowWithOperationsSummaryWebResponseModel
   */
  operationsSummary: WorkflowOperationsSummaryWebModel;
}
