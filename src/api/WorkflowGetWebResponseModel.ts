// tslint:disable
import { WorkflowOperationsSummaryWebModel } from './WorkflowOperationsSummaryWebModel';
import { WorkflowWebModel } from './WorkflowWebModel';
/**
 * Web model for a Workflow
 * @export
 * @interface WorkflowGetWebResponseModel
 */
export interface WorkflowGetWebResponseModel {
  /**
   * The Workflow returned as a result
   * @type {WorkflowWebModel}
   * @memberof WorkflowGetWebResponseModel
   */
  workflow: WorkflowWebModel;
  /**
   * The summary of the UAC operations allowed for this Workflow
   * @type {WorkflowOperationsSummaryWebModel}
   * @memberof WorkflowGetWebResponseModel
   */
  operationsSummary: WorkflowOperationsSummaryWebModel;
}
