import { DodiAttributeWebModel } from './DodiAttributeWebModel';
import { DodiWebModel } from './DodiWebModel';
import { WorkflowActionInputMode } from './WorkflowActionInputMode';
import { WorkflowActionOutputMode } from './WorkflowActionOutputMode';
/**
 * Web response model for the required and optional parameters needed for a workflow action. This response can change when the supplied parameter values marked with WorkflowDynamicParameter change value.
 * @export
 * @interface WorkflowGetActionParametersWebResponseModel
 */
export interface WorkflowGetActionParametersWebResponseModel {
  /**
   * The input dodi type that this action will receive.
   * @type {DodiWebModel}
   * @memberof WorkflowGetActionParametersWebResponseModel
   */
  input?: DodiWebModel;
  /**
   * The behaviour of the action on its input
   * @type {WorkflowActionInputMode}
   * @memberof WorkflowGetActionParametersWebResponseModel
   */
  inputMode: WorkflowActionInputMode;
  /**
   * The output dodi type that this action will emit.
   * @type {DodiWebModel}
   * @memberof WorkflowGetActionParametersWebResponseModel
   */
  output?: DodiWebModel;
  /**
   * The behaviour of the action for its output
   * @type {WorkflowActionOutputMode}
   * @memberof WorkflowGetActionParametersWebResponseModel
   */
  outputMode: WorkflowActionOutputMode;
  /**
   * Complete set of parameters needed by an action of queried type and position in workflow.  This can contain attributes that are not part of the action design. If the system can infer the value, it may set the attribute required property to false, even though it will remain true on the design the attribute belongs to.
   * @type {Array<DodiAttributeWebModel>}
   * @memberof WorkflowGetActionParametersWebResponseModel
   */
  parameters?: Array<DodiAttributeWebModel>;
}
