import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
import { WorkflowActionVariableWebModel } from './WorkflowActionVariableWebModel';
/**
 * Web request model for a workflow action group add action operation
 * @export
 * @interface WorkflowActionGroupAddActionWebRequestModel
 */
export interface WorkflowActionGroupAddActionWebRequestModel {
  /**
   * The id of the node this action should be connected to
   * @type {string}
   * @memberof WorkflowActionGroupAddActionWebRequestModel
   */
  ancestorId: string;
  /**
   * The signature is used to ensure that the workflow action group being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupAddActionWebRequestModel
   */
  signature: string;
  /**
   * The parameters belonging to this action
   * @type {Array<WorkflowActionParameterValueWebModelBase>}
   * @memberof WorkflowActionGroupAddActionWebRequestModel
   */
  parameters: Array<WorkflowActionParameterValueWebModelBase>;
  /**
   * The variables belonging to this action
   * @type {Array<WorkflowActionVariableWebModel>}
   * @memberof WorkflowActionGroupAddActionWebRequestModel
   */
  variables: Array<WorkflowActionVariableWebModel>;
  /**
   * Design code corresponding to the action to add
   * @type {string}
   * @memberof WorkflowActionGroupAddActionWebRequestModel
   */
  actionDesignCode: string;
}
