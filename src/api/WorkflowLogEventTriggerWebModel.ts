import { CollectionCode } from './CollectionCode';
import { ItemChangeType } from './ItemChangeType';
import { WorkflowLogNodeWebModelBase } from './WorkflowLogNodeWebModelBase';
import { EventTrigger } from './EventTrigger';
/**
 * 
 * @export
 * @interface WorkflowLogEventTriggerWebModel
 */
export interface WorkflowLogEventTriggerWebModel extends WorkflowLogNodeWebModelBase {
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
