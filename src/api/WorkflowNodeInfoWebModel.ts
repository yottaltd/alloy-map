// tslint:disable
import { DodiWebModel } from './DodiWebModel';
import { Exception } from './Exception';
import { AlloyException } from './AlloyException';
/**
 * base class representing a node in a workflow - action or trigger
 * @export
 * @interface WorkflowNodeInfoWebModel
 */
export interface WorkflowNodeInfoWebModel {
  /**
   * The trigger for the workflow, see implementations for options.
   * @type {string}
   * @memberof WorkflowNodeInfoWebModel
   */
  id: string;
  /**
   * If set, the dodi that this node emits.  When run, it will output items to connected nodes of this dodi type.
   * @type {DodiWebModel}
   * @memberof WorkflowNodeInfoWebModel
   */
  output?: DodiWebModel;
  /**
   * If set, the workflow is malformed at least at this node, such that the output could not be computed. This workflow will always produce errors when run.
   * @type {AlloyException}
   * @memberof WorkflowNodeInfoWebModel
   */
  error?: AlloyException;
}
