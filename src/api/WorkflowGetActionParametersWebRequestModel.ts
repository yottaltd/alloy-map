// tslint:disable
import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
/**
 * Web request model for a Workflow add action operation
 * @export
 * @interface WorkflowGetActionParametersWebRequestModel
 */
export interface WorkflowGetActionParametersWebRequestModel {
  /**
   * The design code of the action type being queried
   * @type {string}
   * @memberof WorkflowGetActionParametersWebRequestModel
   */
  actionDesignCode: string;
  /**
   * The node this action type would be connected to
   * @type {string}
   * @memberof WorkflowGetActionParametersWebRequestModel
   */
  ancestorId: string;
  /**
   * Parameters marked with the WorkflowDynamicParameter tag. These will affect the dynamic parameter requirements returned.
   * @type {Array<WorkflowActionParameterValueWebModelBase>}
   * @memberof WorkflowGetActionParametersWebRequestModel
   */
  parameters?: Array<WorkflowActionParameterValueWebModelBase>;
}
