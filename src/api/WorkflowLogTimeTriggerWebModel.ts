// tslint:disable
import { WorkflowLogNodeWebModelBase } from './WorkflowLogNodeWebModelBase';
/**
 * Model representing the log of a time based workflow trigger
 * @export
 * @interface WorkflowLogTimeTriggerWebModel
 */
export interface WorkflowLogTimeTriggerWebModel extends WorkflowLogNodeWebModelBase {
  /**
   * Indicates the trigger was scheduled
   * @type {string}
   * @memberof WorkflowLogTimeTriggerWebModel
   */
  scheduledTime: string;
}
