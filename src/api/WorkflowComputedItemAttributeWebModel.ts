import { ItemAttributeWebModel } from './ItemAttributeWebModel';
import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
import { WorkflowSyntaxNodeBaseWebModel } from './WorkflowSyntaxNodeBaseWebModel';
/**
 * 
 * @export
 * @interface WorkflowComputedItemAttributeWebModel
 */
export interface WorkflowComputedItemAttributeWebModel extends WorkflowActionParameterValueWebModelBase {
  /**
   * The attribute to apply the virtual definition to
   * @type {string}
   * @memberof WorkflowComputedItemAttributeWebModel
   */
  attributeCode: string;
  /**
   * The syntax that defines how the value will be computed at run time
   * @type {WorkflowSyntaxNodeBaseWebModel}
   * @memberof WorkflowComputedItemAttributeWebModel
   */
  value: WorkflowSyntaxNodeBaseWebModel;
}
