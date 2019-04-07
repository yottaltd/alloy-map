// tslint:disable
import { WorkflowTimeCronTriggerOnDaysWebModel } from './WorkflowTimeCronTriggerOnDaysWebModel';
/**
 * Model for a workflow trigger that occurs at a fixed time of day on every day, or certain days of the week, or certain days of the month.
 * @export
 * @interface WorkflowTimeCronTriggerWebModel
 */
export interface WorkflowTimeCronTriggerWebModel {
  /**
   * Minute of the day to trigger on
   * @type {number}
   * @memberof WorkflowTimeCronTriggerWebModel
   */
  minute: number;
  /**
   * Hour of the day to trigger on
   * @type {number}
   * @memberof WorkflowTimeCronTriggerWebModel
   */
  hour: number;
  /**
   * Optional model specifying which days to repeat on. If not specified, will repeat every day.
   * @type {WorkflowTimeCronTriggerOnDaysWebModel}
   * @memberof WorkflowTimeCronTriggerWebModel
   */
  on?: WorkflowTimeCronTriggerOnDaysWebModel;
}
