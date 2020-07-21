import { DesignWebModel } from './DesignWebModel';
/**
 * Model for the allowed actions that can be added to a position in a workflow
 * @export
 * @interface WorkflowGetAllowedActionsWebResponseModel
 */
export interface WorkflowGetAllowedActionsWebResponseModel {
  /**
   * The designs corresponding to types of actions that could be added to this position in the workflow queried
   * @type {Array<DesignWebModel>}
   * @memberof WorkflowGetAllowedActionsWebResponseModel
   */
  actionTypes?: Array<DesignWebModel>;
}
