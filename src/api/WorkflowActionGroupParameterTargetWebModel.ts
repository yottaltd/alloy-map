// tslint:disable

/**
 * Web model for action group parameter target
 * @export
 * @interface WorkflowActionGroupParameterTargetWebModel
 */
export interface WorkflowActionGroupParameterTargetWebModel {
  /**
   * An action id corresponding to an action within the action group to target
   * @type {string}
   * @memberof WorkflowActionGroupParameterTargetWebModel
   */
  actionId: string;
  /**
   * A parameter of the corresponding action to target
   * @type {string}
   * @memberof WorkflowActionGroupParameterTargetWebModel
   */
  parameterCode: string;
}
