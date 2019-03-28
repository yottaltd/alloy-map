// tslint:disable

/**
 * Model for the identity of a step taken in a workflow
 * @export
 * @interface WorkflowLogNodeInfoWebModel
 */
export interface WorkflowLogNodeInfoWebModel {
  /**
   * The type of the node that is being logged against
   * @type {string}
   * @memberof WorkflowLogNodeInfoWebModel
   */
  nodeCode: string;
  /**
   * The id of the node within the workflow run
   * @type {string}
   * @memberof WorkflowLogNodeInfoWebModel
   */
  nodeId: string;
  /**
   * The NodeId of the triggering (prior) node
   * @type {string}
   * @memberof WorkflowLogNodeInfoWebModel
   */
  ancestorNodeId?: string;
}
