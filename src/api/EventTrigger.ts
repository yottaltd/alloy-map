// tslint:disable
import { CollectionCode } from './CollectionCode';
import { ItemChangeType } from './ItemChangeType';
import { WorkflowTriggerWebModelBase } from './WorkflowTriggerWebModelBase';
/**
 * Model for a trigger that causes a workflow to run when items are created, edited or deleted.
 * @export
 * @interface EventTrigger
 */
export interface EventTrigger extends WorkflowTriggerWebModelBase {
  /**
   * The trigger will cause the workflow to run only if items of this dodi are affected.
   * @type {string}
   * @memberof EventTrigger
   */
  dodiCode: string;
  /**
   * The trigger will cause the workflow to run only if items of these collections are affected. Live is the default.
   * @type {Array<CollectionCode>}
   * @memberof EventTrigger
   */
  collections?: Array<CollectionCode>;
  /**
   * The trigger will cause the workflow to run only on these item events
   * @type {Array<ItemChangeType>}
   * @memberof EventTrigger
   */
  events: Array<ItemChangeType>;
  /**
   * Only valid if Edit Events are used by this event.  In that case, the trigger will cause the workflow to run only if the specified attributes are affected.
   * @type {Array<string>}
   * @memberof EventTrigger
   */
  attributesListeningFor?: Array<string>;
}
