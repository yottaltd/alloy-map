import { BulkApi } from './BulkApi';
/**
 * Bulk api request base
 * @export
 * @interface BulkApiRequestBase
 */
export interface BulkApiRequestBase {
  /**
   * 
   * @type {string}
   * @memberof BulkApiRequestBase
   */
  discriminator: string;
}
