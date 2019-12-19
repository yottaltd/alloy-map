// tslint:disable
import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
import { DesignWebModel } from './DesignWebModel';
/**
 * Model representing a tree of workflow actions. The output of this action will be the input to the actions in Actions.
 * @export
 * @interface WorkflowActionWebModel
 */
export interface WorkflowActionWebModel {
  /**
   * The design for the action
   * @type {DesignWebModel}
   * @memberof WorkflowActionWebModel
   */
  actionDesign: DesignWebModel;
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
