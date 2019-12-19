// tslint:disable
import { WorkflowActionWebModel } from './WorkflowActionWebModel';
import { WorkflowWithOperationsSummaryWebResponseModel } from './WorkflowWithOperationsSummaryWebResponseModel';
/**
 * Web response model for a Workflow get operation
 * @export
 * @interface WorkflowGetWebResponseModel
 */
export interface WorkflowGetWebResponseModel {
  /**
   * The workflow web model
   * @type {WorkflowWithOperationsSummaryWebResponseModel}
   * @memberof WorkflowGetWebResponseModel
   */
  workflow: WorkflowWithOperationsSummaryWebResponseModel;
  /**
   * The first actions to follow the firing of the trigger on the workflow
   * @type {Array<WorkflowActionWebModel>}
   * @memberof WorkflowGetWebResponseModel
   */
  actions: Array<WorkflowActionWebModel>;
}
