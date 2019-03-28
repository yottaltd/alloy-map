// tslint:disable
import { WorkflowLogNodeInfoWebModel } from './WorkflowLogNodeInfoWebModel';
import { WorkflowNodeRunDataWebModel } from './WorkflowNodeRunDataWebModel';
/**
 * Model representing the log of a time based workflow trigger
 * @export
 * @interface WorkflowLogTimeTriggerWebModel
 */
export interface WorkflowLogTimeTriggerWebModel {
  /**
   * The identity of the step taken in the workflow
   * @type {WorkflowLogNodeInfoWebModel}
   * @memberof WorkflowLogTimeTriggerWebModel
   */
  info: WorkflowLogNodeInfoWebModel;
  /**
   * The output of this step
   * @type {WorkflowNodeRunDataWebModel}
   * @memberof WorkflowLogTimeTriggerWebModel
   */
  output?: WorkflowNodeRunDataWebModel;
  /**
   * Indicates the trigger was scheduled
   * @type {string}
   * @memberof WorkflowLogTimeTriggerWebModel
   */
  scheduledTime: string;
}
