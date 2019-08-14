// tslint:disable
import { MetadataWebModel } from './MetadataWebModel';
import { WorkflowActionWebModel } from './WorkflowActionWebModel';
import { WorkflowNodeInfoWebModel } from './WorkflowNodeInfoWebModel';
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
   * The id of the trigger
   * @type {string}
   * @memberof WorkflowWebModel
   */
  triggerId: string;
  /**
   * The first actions to follow the firing of the trigger on the workflow
   * @type {Array<WorkflowActionWebModel>}
   * @memberof WorkflowWebModel
   */
  actions: Array<WorkflowActionWebModel>;
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
