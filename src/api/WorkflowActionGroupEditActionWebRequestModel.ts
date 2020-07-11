import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
import { WorkflowActionVariableWebModel } from './WorkflowActionVariableWebModel';
/**
 * Web request model for a workflow action group edit action operation
 * @export
 * @interface WorkflowActionGroupEditActionWebRequestModel
 */
export interface WorkflowActionGroupEditActionWebRequestModel {
  /**
   * The signature is used to ensure that the workflow action group being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupEditActionWebRequestModel
   */
  signature: string;
  /**
   * The parameters belonging to this action
   * @type {Array<WorkflowActionParameterValueWebModelBase>}
   * @memberof WorkflowActionGroupEditActionWebRequestModel
   */
  parameters?: Array<WorkflowActionParameterValueWebModelBase>;
  /**
   * The variables belonging to this action
   * @type {Array<WorkflowActionVariableWebModel>}
   * @memberof WorkflowActionGroupEditActionWebRequestModel
   */
  variables?: Array<WorkflowActionVariableWebModel>;
}
