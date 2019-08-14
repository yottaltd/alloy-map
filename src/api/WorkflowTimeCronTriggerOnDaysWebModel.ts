// tslint:disable
import { CalendarOfUnit } from './CalendarOfUnit';
import { TimeCronTrigger } from './TimeCronTrigger';
/**
 * Model representing the optional conditions on the days to repeat on
 * @export
 * @interface WorkflowTimeCronTriggerOnDaysWebModel
 */
export interface WorkflowTimeCronTriggerOnDaysWebModel {
  /**
   * The days to repeat of
   * @type {Array<number>}
   * @memberof WorkflowTimeCronTriggerOnDaysWebModel
   */
  days: Array<number>;
  /**
   * The type of days to repeat on
   * @type {CalendarOfUnit}
   * @memberof WorkflowTimeCronTriggerOnDaysWebModel
   */
  of: CalendarOfUnit;
}
