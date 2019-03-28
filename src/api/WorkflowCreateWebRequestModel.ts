// tslint:disable
import { WorkflowTriggerWebModelBase } from './WorkflowTriggerWebModelBase';
/**
 * Web request model for a Workflow create operation
 * @export
 * @interface WorkflowCreateWebRequestModel
 */
export interface WorkflowCreateWebRequestModel {
  /**
   * The name of the workflow
   * @type {string}
   * @memberof WorkflowCreateWebRequestModel
   */
  name: string;
  /**
   * If set to true, the workflow will run when conditions match the trigger. Otherwise, it will be disabled.
   * @type {boolean}
   * @memberof WorkflowCreateWebRequestModel
   */
  enabled: boolean;
  /**
   * The trigger for the workflow, see implementations for options.
   * @type {WorkflowTriggerWebModelBase}
   * @memberof WorkflowCreateWebRequestModel
   */
  trigger: WorkflowTriggerWebModelBase;
}
