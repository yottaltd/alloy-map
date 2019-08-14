// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ExtendedBulkWebRequestModel } from './ExtendedBulkWebRequestModel';
import { ExtendedBulkApiFp } from './ExtendedBulkApiFp';
/**
 * ExtendedBulkApi - object-oriented interface
 * @export
 * @class ExtendedBulkApi
 * @extends {BaseAPI}
 */
export class ExtendedBulkApi extends BaseAPI {
  /**
   * Creates a job based on the information sent in the model
   * @summary Create a job
   * @param {ExtendedBulkWebRequestModel} model Model containing the job details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedBulkApi
   */
  public bulkGeneric(model: ExtendedBulkWebRequestModel, options?: any) {
    return ExtendedBulkApiFp(this.configuration).bulkGeneric(model, options)(this.fetch, this.basePath);
  }

}
