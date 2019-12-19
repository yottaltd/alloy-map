// tslint:disable

/**
 * Web request model for a Workflow list next dates operation
 * @export
 * @interface WorkflowListNextDateTimesWebRequestModel
 */
export interface WorkflowListNextDateTimesWebRequestModel {
  /**
   * The codes of the workflow to return the next dates for
   * @type {Array<string>}
   * @memberof WorkflowListNextDateTimesWebRequestModel
   */
  workflowCodes: Array<string>;
  /**
   * The number of dates to return
   * @type {number}
   * @memberof WorkflowListNextDateTimesWebRequestModel
   */
  count: number;
}
