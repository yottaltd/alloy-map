import { WorkflowTriggerWebModelBase } from './WorkflowTriggerWebModelBase';
/**
 * 
 * @export
 * @interface TimeCalendarTrigger
 */
export interface TimeCalendarTrigger extends WorkflowTriggerWebModelBase {
  /**
   * Fixed points in time to trigger on
   * @type {Array<Date>}
   * @memberof TimeCalendarTrigger
   */
  dates: Array<Date>;
}
