
/**
 * Model for the querying the allowed actions that can be added to a position in a workflow
 * @export
 * @interface WorkflowGetAllowedActionsWebRequestModel
 */
export interface WorkflowGetAllowedActionsWebRequestModel {
  /**
   * The node this action type would be connected to
   * @type {string}
   * @memberof WorkflowGetAllowedActionsWebRequestModel
   */
  ancestorId: string;
}
