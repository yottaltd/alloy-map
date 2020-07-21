import { AqsJsonNode } from './AqsJsonNode';
import { AqsJsonParameterValue } from './AqsJsonParameterValue';
/**
 * Web request model for an Aqs join operation (the body payload)
 * @export
 * @interface AqsJoinWebRequestBodyModel
 */
export interface AqsJoinWebRequestBodyModel {
  /**
   * the aqs query to process
   * @type {AqsJsonNode}
   * @memberof AqsJoinWebRequestBodyModel
   */
  aqs: AqsJsonNode;
  /**
   * the parameter values to swap out in the aqs query
   * @type {Array<AqsJsonParameterValue>}
   * @memberof AqsJoinWebRequestBodyModel
   */
  parameterValues?: Array<AqsJsonParameterValue>;
}
