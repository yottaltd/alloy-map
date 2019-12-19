// tslint:disable
import { WorkflowTimeCronTriggerOnDaysWebModel } from './WorkflowTimeCronTriggerOnDaysWebModel';
import { WorkflowTriggerWebModelBase } from './WorkflowTriggerWebModelBase';
/**
 * Model for a workflow trigger that occurs at a fixed time of day on every day, or certain days of the week, or certain days of the month.
 * @export
 * @interface TimeCronTrigger
 */
export interface TimeCronTrigger extends WorkflowTriggerWebModelBase {
  /**
   * Minute of the day to trigger on, in the customer's time zone
   * @type {number}
   * @memberof TimeCronTrigger
   */
  minute: number;
  /**
   * Hour of the day to trigger on, in the customer's time zone
   * @type {number}
   * @memberof TimeCronTrigger
   */
  hour: number;
  /**
   * Optional model specifying which days to repeat on. If not specified, will repeat every day.
   * @type {WorkflowTimeCronTriggerOnDaysWebModel}
   * @memberof TimeCronTrigger
   */
  on?: WorkflowTimeCronTriggerOnDaysWebModel;
}
