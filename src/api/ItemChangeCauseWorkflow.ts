import { AId } from './AId';
import { ItemChangeCauseBase } from './ItemChangeCauseBase';
/**
 * 
 * @export
 * @interface ItemChangeCauseWorkflow
 */
export interface ItemChangeCauseWorkflow extends ItemChangeCauseBase {
  /**
   * 
   * @type {AId}
   * @memberof ItemChangeCauseWorkflow
   */
  workflowRunId: AId;
}
