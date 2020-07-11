import { JToken } from './JToken';
/**
 * 
 * @export
 * @interface AqsJsonParameterValue
 */
export interface AqsJsonParameterValue {
  /**
   * 
   * @type {string}
   * @memberof AqsJsonParameterValue
   */
  name: string;
  /**
   * 
   * @type {JToken}
   * @memberof AqsJsonParameterValue
   */
  value: JToken;
}
