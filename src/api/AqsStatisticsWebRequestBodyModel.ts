import { AqsJsonNode } from './AqsJsonNode';
import { AqsJsonParameterValue } from './AqsJsonParameterValue';
/**
 * Web request model for an Aqs statistics operation (the body payload)
 * @export
 * @interface AqsStatisticsWebRequestBodyModel
 */
export interface AqsStatisticsWebRequestBodyModel {
  /**
   * the aqs query to process
   * @type {AqsJsonNode}
   * @memberof AqsStatisticsWebRequestBodyModel
   */
  aqs: AqsJsonNode;
  /**
   * the parameter values to swap out in the aqs query
   * @type {Array<AqsJsonParameterValue>}
   * @memberof AqsStatisticsWebRequestBodyModel
   */
  parameterValues?: Array<AqsJsonParameterValue>;
}
