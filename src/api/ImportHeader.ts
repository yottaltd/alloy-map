import { HeaderType } from './HeaderType';
import { ImportHeaderType } from './ImportHeaderType';
import { JObject } from './JObject';
/**
 * 
 * @export
 * @interface ImportHeader
 */
export interface ImportHeader {
  /**
   * 
   * @type {string}
   * @memberof ImportHeader
   */
  name: string;
  /**
   * 
   * @type {ImportHeaderType}
   * @memberof ImportHeader
   */
  type: ImportHeaderType;
  /**
   * 
   * @type {JObject}
   * @memberof ImportHeader
   */
  data?: JObject;
}
