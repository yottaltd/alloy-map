import { WorkflowItemPropertyType } from './WorkflowItemPropertyType';
import { WorkflowSyntaxArgumentItemValueBaseWebModel } from './WorkflowSyntaxArgumentItemValueBaseWebModel';
/**
 * 
 * @export
 * @interface WorkflowSyntaxArgumentItemValueItemPropertyWebModel
 */
export interface WorkflowSyntaxArgumentItemValueItemPropertyWebModel extends WorkflowSyntaxArgumentItemValueBaseWebModel {
  /**
   * the item property to select
   * @type {WorkflowItemPropertyType}
   * @memberof WorkflowSyntaxArgumentItemValueItemPropertyWebModel
   */
  property: WorkflowItemPropertyType;
}
