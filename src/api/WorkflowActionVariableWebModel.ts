import { WorkflowSyntaxNodeBaseWebModel } from './WorkflowSyntaxNodeBaseWebModel';
/**
 * A variable defined on a workflow action
 * @export
 * @interface WorkflowActionVariableWebModel
 */
export interface WorkflowActionVariableWebModel {
  /**
   * The attribute to apply the virtual definition to
   * @type {string}
   * @memberof WorkflowActionVariableWebModel
   */
  name: string;
  /**
   * The virtual definition
   * @type {WorkflowSyntaxNodeBaseWebModel}
   * @memberof WorkflowActionVariableWebModel
   */
  value: WorkflowSyntaxNodeBaseWebModel;
}
