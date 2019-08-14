// tslint:disable
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
/**
 * Constant parameters taken by the workflow action.  These come from the action design attributes.
 * @export
 * @interface WorkflowConstantItemAttributeWebModel
 */
export interface WorkflowConstantItemAttributeWebModel extends WorkflowActionParameterValueWebModelBase {
  /**
   * A constant attribute value
   * @type {ItemAttributeWebModel}
   * @memberof WorkflowConstantItemAttributeWebModel
   */
  attribute: ItemAttributeWebModel;
}
