
/**
 * Web request model for a workflow action group edit action operation
 * @export
 * @interface WorkflowActionGroupRemoveActionWebRequestModel
 */
export interface WorkflowActionGroupRemoveActionWebRequestModel {
  /**
   * The signature is used to ensure that the workflow action group being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupRemoveActionWebRequestModel
   */
  signature: string;
}
