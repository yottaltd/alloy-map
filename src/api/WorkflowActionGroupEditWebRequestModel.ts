import { WorkflowActionGroupParameterWebModel } from './WorkflowActionGroupParameterWebModel';
/**
 * Web request model for a workflow action group edit operation
 * @export
 * @interface WorkflowActionGroupEditWebRequestModel
 */
export interface WorkflowActionGroupEditWebRequestModel {
  /**
   * The signature is used to ensure that the workflow action group being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupEditWebRequestModel
   */
  signature: string;
  /**
   * The item attributes belonging to this action
   * @type {Array<WorkflowActionGroupParameterWebModel>}
   * @memberof WorkflowActionGroupEditWebRequestModel
   */
  parameters: Array<WorkflowActionGroupParameterWebModel>;
  /**
   * The dodi code that this action group will accept
   * @type {string}
   * @memberof WorkflowActionGroupEditWebRequestModel
   */
  inputDodiCode?: string;
  /**
   * The id of the action within the group that acts as the output
   * @type {string}
   * @memberof WorkflowActionGroupEditWebRequestModel
   */
  outputActionId?: string;
  /**
   * The name of the workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupEditWebRequestModel
   */
  name: string;
}
