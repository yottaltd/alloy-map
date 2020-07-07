import { WorkflowActionGroupParameterWebModel } from './WorkflowActionGroupParameterWebModel';
/**
 * Web request model for a workflow action group create operation
 * @export
 * @interface WorkflowActionGroupCreateWebRequestModel
 */
export interface WorkflowActionGroupCreateWebRequestModel {
  /**
   * Parameter mappings to internal actions
   * @type {Array<WorkflowActionGroupParameterWebModel>}
   * @memberof WorkflowActionGroupCreateWebRequestModel
   */
  parameters?: Array<WorkflowActionGroupParameterWebModel>;
  /**
   * The dodi code that this action group will accept
   * @type {string}
   * @memberof WorkflowActionGroupCreateWebRequestModel
   */
  inputDodiCode?: string;
  /**
   * The id of the action within the group that acts as the output
   * @type {string}
   * @memberof WorkflowActionGroupCreateWebRequestModel
   */
  outputActionId?: string;
  /**
   * The Guc of the corresponding design of the workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupCreateWebRequestModel
   */
  designCode: string;
  /**
   * The name of the workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupCreateWebRequestModel
   */
  name: string;
}
