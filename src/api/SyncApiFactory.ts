import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { SyncBootstrapItemsRequestModel } from './SyncBootstrapItemsRequestModel';
import { SyncDeltaItemsRequestModel } from './SyncDeltaItemsRequestModel';
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
     * Streams a sequence of ItemWebModel BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream.
     * @summary Bootstrap download of initial data (Obsolete)
     * @param {SyncBootstrapItemsRequestModel} model Parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    syncBootStrapObsolete(model: SyncBootstrapItemsRequestModel, options?: any) {
      return SyncApiFp(configuration).syncBootStrapObsolete(model, options)(fetch, basePath);
    },
    /**
     * Streams a sequence of ItemVersion BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until the end of the stream. This endpoint will return all the items matching the query (and the children down the specified graphs) that were edited after the delta date. It will also return all the ids of items still matching the query (and the children down the specified graphs) that were not edited. This means that any item ids NOT returned are assumed to have either been deleted or no longer match the query, which means they can be removed from the remote db being synced via this endpoint
     * @summary Download of delta data
     * @param {SyncDeltaItemsRequestModel} model Parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    syncDelta(model: SyncDeltaItemsRequestModel, options?: any) {
      return SyncApiFp(configuration).syncDelta(model, options)(fetch, basePath);
    },
    /**
     * Streams a sequence of ItemWebModel BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream. This endpoint will return all the items matching the query (and the children down the specified graphs) that were edited after the delta date. It will also return all the ids of items still matching the query (and the children down the specified graphs) that were not edited. This means that all the item ids NOT returned have to assumed either having been delete or not matching the query anymore, which means they can be removed from the remote db that is been synced using this endpoint
     * @summary Download of delta data
     * @param {SyncDeltaItemsRequestModel} model Parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    syncDeltaObsolete(model: SyncDeltaItemsRequestModel, options?: any) {
      return SyncApiFp(configuration).syncDeltaObsolete(model, options)(fetch, basePath);
    },
  };
};
