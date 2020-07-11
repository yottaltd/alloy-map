
/**
 * Web model for Workflow operation summary
 * @export
 * @interface WorkflowOperationsSummaryWebModel
 */
export interface WorkflowOperationsSummaryWebModel {
  /**
   * If true, the current user has permissions to edit this Workflow
   * @type {boolean}
   * @memberof WorkflowOperationsSummaryWebModel
   */
  canWrite: boolean;
  /**
   * If true, the current user has permissions to delete this Workflow
   * @type {boolean}
   * @memberof WorkflowOperationsSummaryWebModel
   */
  canDelete: boolean;
}
