import { WorkflowTriggerWebModelBase } from './WorkflowTriggerWebModelBase';
/**
 * 
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
