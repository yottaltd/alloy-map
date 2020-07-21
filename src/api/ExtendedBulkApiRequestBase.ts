import { ExtendedModelType } from './ExtendedModelType';
import { ExtendedBulkApi } from './ExtendedBulkApi';
/**
 * The base class for available requests on the extended api bulk endpoint
 * @export
 * @interface ExtendedBulkApiRequestBase
 */
export interface ExtendedBulkApiRequestBase {
  /**
   * The type of extended api model to create, edit or delete
   * @type {ExtendedModelType}
   * @memberof ExtendedBulkApiRequestBase
   */
  modelType: ExtendedModelType;
  /**
   * 
   * @type {string}
   * @memberof ExtendedBulkApiRequestBase
   */
  discriminator: string;
}
