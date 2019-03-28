// tslint:disable
import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
/**
 * Web request model for a Workflow add action operation
 * @export
 * @interface WorkflowAddActionWebRequestModel
 */
export interface WorkflowAddActionWebRequestModel {
  /**
   * The id of the node this action should be connected to
   * @type {string}
   * @memberof WorkflowAddActionWebRequestModel
   */
  ancestorId: string;
  /**
   * The signature is used to ensure that the Workflow being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same Workflow
   * @type {string}
   * @memberof WorkflowAddActionWebRequestModel
   */
  signature: string;
  /**
   * The item attributes belonging to this action
   * @type {Array<WorkflowActionParameterValueWebModelBase>}
   * @memberof WorkflowAddActionWebRequestModel
   */
  parameters?: Array<WorkflowActionParameterValueWebModelBase>;
  /**
   * Design code corresponding to the action to add
   * @type {string}
   * @memberof WorkflowAddActionWebRequestModel
   */
  actionDesignCode: string;
}
