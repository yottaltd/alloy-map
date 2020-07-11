
/**
 * Model representing details for failure notifications
 * @export
 * @interface WorkflowFailureNotificationWebModel
 */
export interface WorkflowFailureNotificationWebModel {
  /**
   * Username of the user who should be notified on failure
   * @type {string}
   * @memberof WorkflowFailureNotificationWebModel
   */
  username?: string;
  /**
   * Number of failures since last notification
   * @type {number}
   * @memberof WorkflowFailureNotificationWebModel
   */
  failureCount: number;
  /**
   * The time when the last failure notification was sent
   * @type {string}
   * @memberof WorkflowFailureNotificationWebModel
   */
  lastNotificationTime?: string;
}
