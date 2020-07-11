import { AqsJsonNode } from './AqsJsonNode';
import { WorkflowLogNodeWebModelBase } from './WorkflowLogNodeWebModelBase';
import { ManualTrigger } from './ManualTrigger';
/**
 * 
 * @export
 * @interface WorkflowLogManualTriggerWebModel
 */
export interface WorkflowLogManualTriggerWebModel extends WorkflowLogNodeWebModelBase {
  /**
   * The query to provide the input items for the workflow run. The query should not be specified if the first workflow action does not need any input. Conversely, the query must be specified if the first workflow action needs input, since the workflow could not run without starting from some items
   * @type {AqsJsonNode}
   * @memberof WorkflowLogManualTriggerWebModel
   */
  query?: AqsJsonNode;
  /**
   * The username of the user that triggered the workflow
   * @type {string}
   * @memberof WorkflowLogManualTriggerWebModel
   */
  triggeredByUser: string;
}
