// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { SyncBootstrapItemsRequestModel } from './SyncBootstrapItemsRequestModel';
import { SyncApiFp } from './SyncApiFp';
import { SyncApi } from './SyncApi';
/**
 * SyncApi - factory interface
 * @export
 */
export const SyncApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Streams a sequence of ItemVersion BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream.
     * @summary Bootstrap download of initial data
     * @param {SyncBootstrapItemsRequestModel} model Parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    syncBootStrap(model: SyncBootstrapItemsRequestModel, options?: any) {
      return SyncApiFp(configuration).syncBootStrap(model, options)(fetch, basePath);
    },
    /**
     * Streams a sequence of ItemVersion BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream.
     * @summary Bootstrap download of initial data (Obsolete)
     * @param {SyncBootstrapItemsRequestModel} model Parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    syncBootStrapObsolete(model: SyncBootstrapItemsRequestModel, options?: any) {
      return SyncApiFp(configuration).syncBootStrapObsolete(model, options)(fetch, basePath);
    },
  };
};
