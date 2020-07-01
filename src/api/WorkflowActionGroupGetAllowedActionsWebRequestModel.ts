
/**
 * Model for the querying the allowed actions that can be added to a position in a workflow action group
 * @export
 * @interface WorkflowActionGroupGetAllowedActionsWebRequestModel
 */
export interface WorkflowActionGroupGetAllowedActionsWebRequestModel {
  /**
   * The node this action type would be connected to
   * @type {string}
   * @memberof WorkflowActionGroupGetAllowedActionsWebRequestModel
   */
  ancestorId: string;
}
