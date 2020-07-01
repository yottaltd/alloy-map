import { ItemAttributeWebModel } from './ItemAttributeWebModel';
import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
/**
 * 
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
