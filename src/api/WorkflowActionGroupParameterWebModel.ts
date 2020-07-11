import { WorkflowActionGroupParameterTargetWebModel } from './WorkflowActionGroupParameterTargetWebModel';
/**
 * Web model for action group parameter
 * @export
 * @interface WorkflowActionGroupParameterWebModel
 */
export interface WorkflowActionGroupParameterWebModel {
  /**
   * The action group design parameter to be used
   * @type {string}
   * @memberof WorkflowActionGroupParameterWebModel
   */
  parameterCode: string;
  /**
   * The targets within the action group actions to apply the parameter to
   * @type {Array<WorkflowActionGroupParameterTargetWebModel>}
   * @memberof WorkflowActionGroupParameterWebModel
   */
  targetParameters: Array<WorkflowActionGroupParameterTargetWebModel>;
}
