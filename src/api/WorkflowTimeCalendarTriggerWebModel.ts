// tslint:disable

/**
 * Workflow trigger model given a set of fixed points in time
 * @export
 * @interface WorkflowTimeCalendarTriggerWebModel
 */
export interface WorkflowTimeCalendarTriggerWebModel {
  /**
   * Fixed points in time to trigger on
   * @type {Array<Date>}
   * @memberof WorkflowTimeCalendarTriggerWebModel
   */
  dates: Array<Date>;
}
