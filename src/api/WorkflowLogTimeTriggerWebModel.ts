import { WorkflowLogNodeWebModelBase } from './WorkflowLogNodeWebModelBase';
/**
 * 
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
