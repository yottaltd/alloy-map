import { DateTimeRangeWebModel } from './DateTimeRangeWebModel';
import { WorkingDaysTimeConditionType } from './WorkingDaysTimeConditionType';
/**
 * Model representing a temporal precondition on workflow being triggered
 * @export
 * @interface WorkflowTimeConditionWebModel
 */
export interface WorkflowTimeConditionWebModel {
  /**
   * Optional condition if the workflow should trigger on working days (true) or non-working days (false)
   * @type {WorkingDaysTimeConditionType}
   * @memberof WorkflowTimeConditionWebModel
   */
  workingDaysTimeConditionType: WorkingDaysTimeConditionType;
  /**
   * Any dateTime ranges, in UTC, for when the workflow should not trigger
   * @type {Array<DateTimeRangeWebModel>}
   * @memberof WorkflowTimeConditionWebModel
   */
  exceptions?: Array<DateTimeRangeWebModel>;
}
