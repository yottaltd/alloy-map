// tslint:disable
import { CollectionCode } from './CollectionCode';
import { ItemChangeType } from './ItemChangeType';
import { WorkflowLogNodeInfoWebModel } from './WorkflowLogNodeInfoWebModel';
import { WorkflowNodeRunDataWebModel } from './WorkflowNodeRunDataWebModel';
/**
 * Model representing the log of an event based trigger
 * @export
 * @interface WorkflowLogEventTriggerWebModel
 */
export interface WorkflowLogEventTriggerWebModel {
  /**
   * The identity of the step taken in the workflow
   * @type {WorkflowLogNodeInfoWebModel}
   * @memberof WorkflowLogEventTriggerWebModel
   */
  info: WorkflowLogNodeInfoWebModel;
  /**
   * The output of this step
   * @type {WorkflowNodeRunDataWebModel}
   * @memberof WorkflowLogEventTriggerWebModel
   */
  output?: WorkflowNodeRunDataWebModel;
  /**
   * The collection of the item that caused the trigger
   * @type {CollectionCode}
   * @memberof WorkflowLogEventTriggerWebModel
   */
  collection: CollectionCode;
  /**
   * The type of event that caused the trigger
   * @type {ItemChangeType}
   * @memberof WorkflowLogEventTriggerWebModel
   */
  eventType: ItemChangeType;
  /**
   * The affected attributes if any that caused the trigger
   * @type {Array<string>}
   * @memberof WorkflowLogEventTriggerWebModel
   */
  attributesTriggeredBy?: Array<string>;
}
