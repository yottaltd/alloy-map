import { OffsetOriginType } from './OffsetOriginType';
import { WorkflowSyntaxNodeBaseWebModel } from './WorkflowSyntaxNodeBaseWebModel';
import { WorkflowTimeConditionWebModel } from './WorkflowTimeConditionWebModel';
/**
 * 
 * @export
 * @interface WorkflowSyntaxNodeRelativeTimeWebModel
 */
export interface WorkflowSyntaxNodeRelativeTimeWebModel extends WorkflowSyntaxNodeBaseWebModel {
  /**
   * Condition specifying at what times the Offset applies
   * @type {WorkflowTimeConditionWebModel}
   * @memberof WorkflowSyntaxNodeRelativeTimeWebModel
   */
  condition?: WorkflowTimeConditionWebModel;
  /**
   * Milliseconds to offset from now, given the specified condition
   * @type {number}
   * @memberof WorkflowSyntaxNodeRelativeTimeWebModel
   */
  offsetMilliseconds: number;
  /**
   * Optional origin to offset from
   * @type {OffsetOriginType}
   * @memberof WorkflowSyntaxNodeRelativeTimeWebModel
   */
  offsetOrigin?: OffsetOriginType;
}
