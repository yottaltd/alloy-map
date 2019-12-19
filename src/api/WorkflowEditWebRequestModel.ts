// tslint:disable
import { WorkflowTimeConditionWebModel } from './WorkflowTimeConditionWebModel';
import { WorkflowTriggerWebModelBase } from './WorkflowTriggerWebModelBase';
/**
 * Web request model for a Workflow edit operation
 * @export
 * @interface WorkflowEditWebRequestModel
 */
export interface WorkflowEditWebRequestModel {
  /**
   * The name of the workflow
   * @type {string}
   * @memberof WorkflowEditWebRequestModel
   */
  name: string;
  /**
   * If set to true, the workflow will run when conditions match the trigger. Otherwise, it will be disabled.
   * @type {boolean}
   * @memberof WorkflowEditWebRequestModel
   */
  enabled: boolean;
  /**
   * Optional precondition that places additional conditions on the triggering of the workflow.
   * @type {WorkflowTimeConditionWebModel}
   * @memberof WorkflowEditWebRequestModel
   */
  preCondition?: WorkflowTimeConditionWebModel;
  /**
   * The trigger for the workflow, see implementations for options.
   * @type {WorkflowTriggerWebModelBase}
   * @memberof WorkflowEditWebRequestModel
   */
  trigger: WorkflowTriggerWebModelBase;
  /**
   * The signature is used to ensure that the Workflow being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same Workflow
   * @type {string}
   * @memberof WorkflowEditWebRequestModel
   */
  signature: string;
}
