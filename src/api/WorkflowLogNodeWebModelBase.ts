// tslint:disable
import { WorkflowLogNodeInfoWebModel } from './WorkflowLogNodeInfoWebModel';
import { WorkflowNodeRunDataWebModel } from './WorkflowNodeRunDataWebModel';
/**
 * Base class for models representing a node on a workflow run. This could be either an action or a trigger.
 * @export
 * @interface WorkflowLogNodeWebModelBase
 */
export interface WorkflowLogNodeWebModelBase {
  /**
   * The identity of the step taken in the workflow
   * @type {WorkflowLogNodeInfoWebModel}
   * @memberof WorkflowLogNodeWebModelBase
   */
  info: WorkflowLogNodeInfoWebModel;
  /**
   * The output of this step
   * @type {WorkflowNodeRunDataWebModel}
   * @memberof WorkflowLogNodeWebModelBase
   */
  output?: WorkflowNodeRunDataWebModel;
  /**
   * 
   * @type {string}
   * @memberof WorkflowLogNodeWebModelBase
   */
  discriminator: string;
}
