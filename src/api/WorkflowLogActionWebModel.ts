import { LogAction } from './LogAction';
import { WorkflowActionParameterValueWebModelBase } from './WorkflowActionParameterValueWebModelBase';
import { WorkflowLogNodeWebModelBase } from './WorkflowLogNodeWebModelBase';
import { WorkflowNodeRunDataWebModel } from './WorkflowNodeRunDataWebModel';
/**
 * 
 * @export
 * @interface WorkflowLogActionWebModel
 */
export interface WorkflowLogActionWebModel extends WorkflowLogNodeWebModelBase {
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
