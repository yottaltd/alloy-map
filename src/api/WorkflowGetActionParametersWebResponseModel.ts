// tslint:disable
import { DodiAttributeWebModel } from './DodiAttributeWebModel';
/**
 * Web response model for the required and optional parameters needed for a workflow action. This response can change when the supplied parameter values marked with WorkflowDynamicParameter change value.
 * @export
 * @interface WorkflowGetActionParametersWebResponseModel
 */
export interface WorkflowGetActionParametersWebResponseModel {
  /**
   * The input dodi type that this action will receive.  This is not normally needed to be known, except in some special cases where complex parameter value restriction is required.  Currently, the only case for this is when selecting a report type dodi code for the run report action parameter.
   * @type {string}
   * @memberof WorkflowGetActionParametersWebResponseModel
   */
  inputDodiCode?: string;
  /**
   * Complete set of parameters needed by an action of queried type and position in workflow.  This can contain attributes that are not part of the action design. If the system can infer the value, it may set the attribute required property to false, even though it will remain true on the design the attribute belongs to.
   * @type {Array<DodiAttributeWebModel>}
   * @memberof WorkflowGetActionParametersWebResponseModel
   */
  parameters?: Array<DodiAttributeWebModel>;
}
