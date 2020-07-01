import { WorkflowFailureNotificationInfoWebModel } from './WorkflowFailureNotificationInfoWebModel';
import { WorkflowTimeConditionWebModel } from './WorkflowTimeConditionWebModel';
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
   * Optional precondition that places additional conditions on the triggering of the workflow.
   * @type {WorkflowTimeConditionWebModel}
   * @memberof WorkflowCreateWebRequestModel
   */
  preCondition?: WorkflowTimeConditionWebModel;
  /**
   * The trigger for the workflow, see implementations for options.
   * @type {WorkflowTriggerWebModelBase}
   * @memberof WorkflowCreateWebRequestModel
   */
  trigger: WorkflowTriggerWebModelBase;
  /**
   * Failure notification information for the workflow, see implementations for options.
   * @type {WorkflowFailureNotificationInfoWebModel}
   * @memberof WorkflowCreateWebRequestModel
   */
  failureNotification?: WorkflowFailureNotificationInfoWebModel;
}
