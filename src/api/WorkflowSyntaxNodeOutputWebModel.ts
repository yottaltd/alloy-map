import { WorkflowSyntaxArgumentItemValueBaseWebModel } from './WorkflowSyntaxArgumentItemValueBaseWebModel';
import { WorkflowSyntaxNodeBaseWebModel } from './WorkflowSyntaxNodeBaseWebModel';
/**
 * 
 * @export
 * @interface WorkflowSyntaxNodeOutputWebModel
 */
export interface WorkflowSyntaxNodeOutputWebModel extends WorkflowSyntaxNodeBaseWebModel {
  /**
   * The Alloy Id of the action to evaluate this node on
   * @type {string}
   * @memberof WorkflowSyntaxNodeOutputWebModel
   */
  outputAction: string;
  /**
   * The item value to select from the specified action output
   * @type {WorkflowSyntaxArgumentItemValueBaseWebModel}
   * @memberof WorkflowSyntaxNodeOutputWebModel
   */
  itemValue: WorkflowSyntaxArgumentItemValueBaseWebModel;
}
