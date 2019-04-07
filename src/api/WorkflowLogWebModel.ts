// tslint:disable
import { Exception } from './Exception';
import { WorkflowLogNodeWebModelBase } from './WorkflowLogNodeWebModelBase';
import { AlloyException } from './AlloyException';
/**
 * Web model for a Workflow
 * @export
 * @interface WorkflowLogWebModel
 */
export interface WorkflowLogWebModel {
  /**
   * The code of the logging workflow
   * @type {string}
   * @memberof WorkflowLogWebModel
   */
  code: string;
  /**
   * The part of the workflow being logged
   * @type {WorkflowLogNodeWebModelBase}
   * @memberof WorkflowLogWebModel
   */
  node?: WorkflowLogNodeWebModelBase;
  /**
   * The log message
   * @type {string}
   * @memberof WorkflowLogWebModel
   */
  message: string;
  /**
   * Any error associated with the log
   * @type {AlloyException}
   * @memberof WorkflowLogWebModel
   */
  error?: AlloyException;
  /**
   * The time the log was written
   * @type {string}
   * @memberof WorkflowLogWebModel
   */
  created: string;
  /**
   * The id of the workflow run the log originated from
   * @type {string}
   * @memberof WorkflowLogWebModel
   */
  runId: string;
}
