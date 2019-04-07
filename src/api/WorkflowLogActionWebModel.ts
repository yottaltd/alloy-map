// tslint:disable
import { LogAction } from './LogAction';
import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
import { WorkflowLogNodeInfoWebModel } from './WorkflowLogNodeInfoWebModel';
import { WorkflowNodeRunDataWebModel } from './WorkflowNodeRunDataWebModel';
/**
 * Model representing the log of an action node
 * @export
 * @interface WorkflowLogActionWebModel
 */
export interface WorkflowLogActionWebModel {
  /**
   * The identity of the step taken in the workflow
   * @type {WorkflowLogNodeInfoWebModel}
   * @memberof WorkflowLogActionWebModel
   */
  info: WorkflowLogNodeInfoWebModel;
  /**
   * The output of this step
   * @type {WorkflowNodeRunDataWebModel}
   * @memberof WorkflowLogActionWebModel
   */
  output?: WorkflowNodeRunDataWebModel;
  /**
   * The parameters the action was created with
   * @type {Array<WorkflowActionParameterValueWebModelBase>}
   * @memberof WorkflowLogActionWebModel
   */
  parameters: Array<WorkflowActionParameterValueWebModelBase>;
  /**
   * The inputs the action has received
   * @type {WorkflowNodeRunDataWebModel}
   * @memberof WorkflowLogActionWebModel
   */
  input?: WorkflowNodeRunDataWebModel;
}
