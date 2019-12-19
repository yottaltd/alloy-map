// tslint:disable
import { MetadataWebModel } from './MetadataWebModel';
import { WorkflowNodeInfoWebModel } from './WorkflowNodeInfoWebModel';
import { WorkflowTimeConditionWebModel } from './WorkflowTimeConditionWebModel';
import { WorkflowTriggerWebModelBase } from './WorkflowTriggerWebModelBase';
/**
 * Web model for a Workflow
 * @export
 * @interface WorkflowWebModel
 */
export interface WorkflowWebModel {
  /**
   * The name of the workflow
   * @type {string}
   * @memberof WorkflowWebModel
   */
  name: string;
  /**
   * If set to true, the workflow will run when conditions match the trigger. Otherwise, it will be disabled.
   * @type {boolean}
   * @memberof WorkflowWebModel
   */
  enabled: boolean;
  /**
   * Optional precondition that places additional conditions on the triggering of the workflow.
   * @type {WorkflowTimeConditionWebModel}
   * @memberof WorkflowWebModel
   */
  preCondition?: WorkflowTimeConditionWebModel;
  /**
   * The trigger for the workflow, see implementations for options.
   * @type {WorkflowTriggerWebModelBase}
   * @memberof WorkflowWebModel
   */
  trigger: WorkflowTriggerWebModelBase;
  /**
   * Information about this workflow node
   * @type {WorkflowNodeInfoWebModel}
   * @memberof WorkflowWebModel
   */
  triggerNodeInfo: WorkflowNodeInfoWebModel;
  /**
   * The code of the workflow
   * @type {string}
   * @memberof WorkflowWebModel
   */
  code: string;
  /**
   * The metadata to a workflow
   * @type {MetadataWebModel}
   * @memberof WorkflowWebModel
   */
  metadata: MetadataWebModel;
}
