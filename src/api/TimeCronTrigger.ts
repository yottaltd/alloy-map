import { WorkflowTimeCronTriggerOnDaysWebModel } from './WorkflowTimeCronTriggerOnDaysWebModel';
import { WorkflowTriggerWebModelBase } from './WorkflowTriggerWebModelBase';
/**
 * 
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
