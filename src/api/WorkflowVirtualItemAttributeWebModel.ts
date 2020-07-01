import { ItemAttributeWebModel } from './ItemAttributeWebModel';
import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
/**
 * 
 * @export
 * @interface WorkflowVirtualItemAttributeWebModel
 */
export interface WorkflowVirtualItemAttributeWebModel extends WorkflowActionParameterValueWebModelBase {
  /**
   * The attribute to apply the virtual definition to
   * @type {string}
   * @memberof WorkflowVirtualItemAttributeWebModel
   */
  attributeCode: string;
  /**
   * The virtual definition
   * @type {string}
   * @memberof WorkflowVirtualItemAttributeWebModel
   */
  virtualDefinition: string;
}
