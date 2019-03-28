// tslint:disable

/**
 * Web request model for a Workflow edit action operation
 * @export
 * @interface WorkflowRemoveActionWebRequestModel
 */
export interface WorkflowRemoveActionWebRequestModel {
  /**
   * The signature is used to ensure that the Workflow being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same Workflow
   * @type {string}
   * @memberof WorkflowRemoveActionWebRequestModel
   */
  signature: string;
}
