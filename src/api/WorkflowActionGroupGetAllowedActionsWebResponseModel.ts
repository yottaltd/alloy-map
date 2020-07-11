import { DesignWebModel } from './DesignWebModel';
/**
 * Model for the allowed actions that can be added to a position in a workflow action group
 * @export
 * @interface WorkflowActionGroupGetAllowedActionsWebResponseModel
 */
export interface WorkflowActionGroupGetAllowedActionsWebResponseModel {
  /**
   * The designs corresponding to types of actions that could be added to this position in the workflow action group queried
   * @type {Array<DesignWebModel>}
   * @memberof WorkflowActionGroupGetAllowedActionsWebResponseModel
   */
  actionTypes?: Array<DesignWebModel>;
}
