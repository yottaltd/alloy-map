// tslint:disable
import { WorkflowWebModel } from './WorkflowWebModel';
/**
 * Web model for a workflow action related response
 * @export
 * @interface WorkflowAddActionWebResponseModel
 */
export interface WorkflowAddActionWebResponseModel {
  /**
   * The Workflow action
   * @type {WorkflowWebModel}
   * @memberof WorkflowAddActionWebResponseModel
   */
  workflow: WorkflowWebModel;
  /**
   * The id of the action that was added
   * @type {string}
   * @memberof WorkflowAddActionWebResponseModel
   */
  actionId: string;
}
