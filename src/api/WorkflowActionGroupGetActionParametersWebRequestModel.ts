import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
import { WorkflowActionVariableWebModel } from './WorkflowActionVariableWebModel';
/**
 * Web request model for a workflow action group add action operation
 * @export
 * @interface WorkflowActionGroupGetActionParametersWebRequestModel
 */
export interface WorkflowActionGroupGetActionParametersWebRequestModel {
  /**
   * The design code of the action type being queried
   * @type {string}
   * @memberof WorkflowActionGroupGetActionParametersWebRequestModel
   */
  actionDesignCode: string;
  /**
   * The node this action type would be connected to
   * @type {string}
   * @memberof WorkflowActionGroupGetActionParametersWebRequestModel
   */
  ancestorId: string;
  /**
   * Parameters marked with the WorkflowDynamicParameter tag. These will affect the dynamic parameter requirements returned.
   * @type {Array<WorkflowActionParameterValueWebModelBase>}
   * @memberof WorkflowActionGroupGetActionParametersWebRequestModel
   */
  parameters?: Array<WorkflowActionParameterValueWebModelBase>;
  /**
   * The variables belonging to this action group
   * @type {Array<WorkflowActionVariableWebModel>}
   * @memberof WorkflowActionGroupGetActionParametersWebRequestModel
   */
  variables?: Array<WorkflowActionVariableWebModel>;
}
