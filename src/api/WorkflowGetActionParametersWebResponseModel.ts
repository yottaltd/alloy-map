// tslint:disable
import { DodiAttributeWebModel } from './DodiAttributeWebModel';
import { DodiWebModel } from './DodiWebModel';
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
   * The output dodi type that this action will emit.
   * @type {DodiWebModel}
   * @memberof WorkflowGetActionParametersWebResponseModel
   */
  output?: DodiWebModel;
  /**
   * Complete set of parameters needed by an action of queried type and position in workflow.  This can contain attributes that are not part of the action design. If the system can infer the value, it may set the attribute required property to false, even though it will remain true on the design the attribute belongs to.
   * @type {Array<DodiAttributeWebModel>}
   * @memberof WorkflowGetActionParametersWebResponseModel
   */
  parameters?: Array<DodiAttributeWebModel>;
}
