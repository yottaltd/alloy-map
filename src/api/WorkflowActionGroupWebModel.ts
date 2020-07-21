import { MetadataWebModel } from './MetadataWebModel';
import { WorkflowActionGroupParameterWebModel } from './WorkflowActionGroupParameterWebModel';
/**
 * Web model for a workflow action group
 * @export
 * @interface WorkflowActionGroupWebModel
 */
export interface WorkflowActionGroupWebModel {
  /**
   * Parameter mappings to internal actions
   * @type {Array<WorkflowActionGroupParameterWebModel>}
   * @memberof WorkflowActionGroupWebModel
   */
  parameters: Array<WorkflowActionGroupParameterWebModel>;
  /**
   * The dodi code that this action group will accept
   * @type {string}
   * @memberof WorkflowActionGroupWebModel
   */
  inputDodiCode?: string;
  /**
   * The id of the action within the group that acts as the output
   * @type {string}
   * @memberof WorkflowActionGroupWebModel
   */
  outputActionId?: string;
  /**
   * The name of the workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupWebModel
   */
  name: string;
  /**
   * The code of the workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupWebModel
   */
  code: string;
  /**
   * The code of the corresponding design of the workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupWebModel
   */
  designCode: string;
  /**
   * The metadata to a workflow action group
   * @type {MetadataWebModel}
   * @memberof WorkflowActionGroupWebModel
   */
  metadata: MetadataWebModel;
}
