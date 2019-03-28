// tslint:disable
import { TimeIntervalUnit } from './TimeIntervalUnit';
/**
 * Model for a workflow trigger that begins at a point in time, and keeps repeating after a fixed time span thereafter.
 * @export
 * @interface WorkflowTimeFrequencyTriggerWebModel
 */
export interface WorkflowTimeFrequencyTriggerWebModel {
  /**
   * The number of Units between each event
   * @type {number}
   * @memberof WorkflowTimeFrequencyTriggerWebModel
   */
  interval: number;
  /**
   * The units described by the Interval property
   * @type {TimeIntervalUnit}
   * @memberof WorkflowTimeFrequencyTriggerWebModel
   */
  units: TimeIntervalUnit;
  /**
   * The point in time the frequent starts repeating from
   * @type {string}
   * @memberof WorkflowTimeFrequencyTriggerWebModel
   */
  start: string;
}
