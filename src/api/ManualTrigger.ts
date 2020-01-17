// tslint:disable
import { WorkflowTriggerWebModelBase } from './WorkflowTriggerWebModelBase';
/**
 * Model for a trigger that causes a workflow to run when items are created, edited or deleted.
 * @export
 * @interface ManualTrigger
 */
export interface ManualTrigger extends WorkflowTriggerWebModelBase {
  /**
   * The trigger will cause the workflow to run only if items of this dodi are affected.
   * @type {string}
   * @memberof ManualTrigger
   */
  dodiCode?: string;
}
