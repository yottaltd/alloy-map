import { AqsJsonNode } from './AqsJsonNode';
import { WorkflowSyntaxNodeBaseWebModel } from './WorkflowSyntaxNodeBaseWebModel';
/**
 * 
 * @export
 * @interface WorkflowSyntaxNodeAqsWebModel
 */
export interface WorkflowSyntaxNodeAqsWebModel extends WorkflowSyntaxNodeBaseWebModel {
  /**
   * The value of the Aqs
   * @type {AqsJsonNode}
   * @memberof WorkflowSyntaxNodeAqsWebModel
   */
  aqs: AqsJsonNode;
}
