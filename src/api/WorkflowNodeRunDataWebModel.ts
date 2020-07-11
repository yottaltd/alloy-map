
/**
 * Model for a set of data associated with a workflow step
 * @export
 * @interface WorkflowNodeRunDataWebModel
 */
export interface WorkflowNodeRunDataWebModel {
  /**
   * The ids of the items
   * @type {Array<string>}
   * @memberof WorkflowNodeRunDataWebModel
   */
  itemIds?: Array<string>;
  /**
   * If true, this action stopped the workflow actions chain it was on and no sequent action on that chain was thus executed
   * @type {boolean}
   * @memberof WorkflowNodeRunDataWebModel
   */
  stopChain: boolean;
}
