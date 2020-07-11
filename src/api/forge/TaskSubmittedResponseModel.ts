
/**
 * Returned when forge has accepted and queued your requested action
 * @export
 * @interface TaskSubmittedResponseModel
 */
export interface TaskSubmittedResponseModel {
  /**
   * Task Id corresponding to requested action. Use this against the Task endpoint to track the status of your request.
   * @type {string}
   * @memberof TaskSubmittedResponseModel
   */
  taskId: string;
}
