import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
import { WorkflowSyntaxNodeBaseWebModel } from './WorkflowSyntaxNodeBaseWebModel';
/**
 * 
 * @export
 * @interface WorkflowSyntaxNodeScriptWebModel
 */
export interface WorkflowSyntaxNodeScriptWebModel extends WorkflowSyntaxNodeBaseWebModel {
  /**
   * The value of the Script
   * @type {string}
   * @memberof WorkflowSyntaxNodeScriptWebModel
   */
  script: string;
  /**
   * Optional detail about promised return type
   * @type {DodiAttributeOptionsWebModelBase}
   * @memberof WorkflowSyntaxNodeScriptWebModel
   */
  returnOptions?: DodiAttributeOptionsWebModelBase;
}
