// tslint:disable
import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
/**
 * Model representing a tree of workflow actions. The output of this action will be the input to the actions in Actions.
 * @export
 * @interface WorkflowActionWebModel
 */
export interface WorkflowActionWebModel {
  /**
   * The design code for the action
   * @type {string}
   * @memberof WorkflowActionWebModel
   */
  actionDesignCode: string;
  /**
   * The action id
   * @type {string}
   * @memberof WorkflowActionWebModel
   */
  actionId: string;
  /**
   * The actions that will follow this action.
   * @type {Array<WorkflowActionWebModel>}
   * @memberof WorkflowActionWebModel
   */
  actions?: Array<WorkflowActionWebModel>;
  /**
   * The parameters that the workflow will run this action with
   * @type {Array<WorkflowActionParameterValueWebModelBase>}
   * @memberof WorkflowActionWebModel
   */
  parameters?: Array<WorkflowActionParameterValueWebModelBase>;
}
