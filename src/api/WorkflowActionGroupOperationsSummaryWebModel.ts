// tslint:disable

/**
 * Web model for workflow action group operation summary
 * @export
 * @interface WorkflowActionGroupOperationsSummaryWebModel
 */
export interface WorkflowActionGroupOperationsSummaryWebModel {
  /**
   * If true, the current user has permissions to edit this workflow action group
   * @type {boolean}
   * @memberof WorkflowActionGroupOperationsSummaryWebModel
   */
  canWrite: boolean;
  /**
   * If true, the current user has permissions to delete this workflow action group
   * @type {boolean}
   * @memberof WorkflowActionGroupOperationsSummaryWebModel
   */
  canDelete: boolean;
}
