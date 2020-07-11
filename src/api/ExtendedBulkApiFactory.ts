import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ExtendedBulkWebRequestModel } from './ExtendedBulkWebRequestModel';
import { ExtendedBulkApiFp } from './ExtendedBulkApiFp';
import { ExtendedBulkApi } from './ExtendedBulkApi';
/**
 * ExtendedBulkApi - factory interface
 * @export
 */
export const ExtendedBulkApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Creates a job based on the information sent in the model
     * @summary Create a job
     * @param {ExtendedBulkWebRequestModel} model Model containing the job details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkGeneric(model: ExtendedBulkWebRequestModel, options?: any) {
      return ExtendedBulkApiFp(configuration).bulkGeneric(model, options)(fetch, basePath);
    },
  };
};
