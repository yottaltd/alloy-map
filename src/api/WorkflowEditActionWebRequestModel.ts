import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
import { WorkflowActionVariableWebModel } from './WorkflowActionVariableWebModel';
/**
 * Web request model for a Workflow edit action operation
 * @export
 * @interface WorkflowEditActionWebRequestModel
 */
export interface WorkflowEditActionWebRequestModel {
  /**
   * The signature is used to ensure that the Workflow being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same Workflow
   * @type {string}
   * @memberof WorkflowEditActionWebRequestModel
   */
  signature: string;
  /**
   * The parameters belonging to this action
   * @type {Array<WorkflowActionParameterValueWebModelBase>}
   * @memberof WorkflowEditActionWebRequestModel
   */
  parameters?: Array<WorkflowActionParameterValueWebModelBase>;
  /**
   * The variables belonging to this action
   * @type {Array<WorkflowActionVariableWebModel>}
   * @memberof WorkflowEditActionWebRequestModel
   */
  variables?: Array<WorkflowActionVariableWebModel>;
}
