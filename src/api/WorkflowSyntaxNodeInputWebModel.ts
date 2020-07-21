import { WorkflowSyntaxArgumentItemValueBaseWebModel } from './WorkflowSyntaxArgumentItemValueBaseWebModel';
import { WorkflowSyntaxNodeBaseWebModel } from './WorkflowSyntaxNodeBaseWebModel';
/**
 * 
 * @export
 * @interface WorkflowSyntaxNodeInputWebModel
 */
export interface WorkflowSyntaxNodeInputWebModel extends WorkflowSyntaxNodeBaseWebModel {
  /**
   * The ancestor action to take the input from.
   * @type {number}
   * @memberof WorkflowSyntaxNodeInputWebModel
   */
  inputParent: number;
  /**
   * The item value to select from the specified input
   * @type {WorkflowSyntaxArgumentItemValueBaseWebModel}
   * @memberof WorkflowSyntaxNodeInputWebModel
   */
  itemValue: WorkflowSyntaxArgumentItemValueBaseWebModel;
}
