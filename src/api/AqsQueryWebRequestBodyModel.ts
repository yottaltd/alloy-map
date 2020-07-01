import { AqsJsonNode } from './AqsJsonNode';
import { AqsJsonParameterValue } from './AqsJsonParameterValue';
/**
 * Web request model for an Aqs query operation (the body payload)
 * @export
 * @interface AqsQueryWebRequestBodyModel
 */
export interface AqsQueryWebRequestBodyModel {
  /**
   * the aqs query to process
   * @type {AqsJsonNode}
   * @memberof AqsQueryWebRequestBodyModel
   */
  aqs: AqsJsonNode;
  /**
   * the parameter values to swap out in the aqs query
   * @type {Array<AqsJsonParameterValue>}
   * @memberof AqsQueryWebRequestBodyModel
   */
  parameterValues?: Array<AqsJsonParameterValue>;
}
