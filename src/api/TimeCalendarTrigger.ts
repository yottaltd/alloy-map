// tslint:disable
import { WorkflowTriggerWebModelBase } from './WorkflowTriggerWebModelBase';
/**
 * Workflow trigger model given a set of fixed points in time
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
