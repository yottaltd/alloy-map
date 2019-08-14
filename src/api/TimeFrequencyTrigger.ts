// tslint:disable
import { TimeIntervalUnit } from './TimeIntervalUnit';
import { WorkflowTriggerWebModelBase } from './WorkflowTriggerWebModelBase';
/**
 * Model for a workflow trigger that begins at a point in time, and keeps repeating after a fixed time span thereafter.
 * @export
 * @interface TimeFrequencyTrigger
 */
export interface TimeFrequencyTrigger extends WorkflowTriggerWebModelBase {
  /**
   * The number of Units between each event
   * @type {number}
   * @memberof TimeFrequencyTrigger
   */
  interval: number;
  /**
   * The units described by the Interval property
   * @type {TimeIntervalUnit}
   * @memberof TimeFrequencyTrigger
   */
  units: TimeIntervalUnit;
  /**
   * The point in time the frequent starts repeating from
   * @type {string}
   * @memberof TimeFrequencyTrigger
   */
  start: string;
}
