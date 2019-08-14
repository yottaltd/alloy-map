// tslint:disable
import { BaseAPI } from './BaseAPI';
import { SyncBootstrapItemsRequestModel } from './SyncBootstrapItemsRequestModel';
import { SyncDeltaItemsRequestModel } from './SyncDeltaItemsRequestModel';
import { SyncApiFp } from './SyncApiFp';
/**
 * SyncApi - object-oriented interface
 * @export
 * @class SyncApi
 * @extends {BaseAPI}
 */
export class SyncApi extends BaseAPI {
  /**
   * Streams a sequence of ItemVersion BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream.
   * @summary Bootstrap download of initial data
   * @param {SyncBootstrapItemsRequestModel} model Parameters
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SyncApi
   */
  public syncBootStrap(model: SyncBootstrapItemsRequestModel, options?: any) {
    return SyncApiFp(this.configuration).syncBootStrap(model, options)(this.fetch, this.basePath);
  }

  /**
   * Streams a sequence of ItemWebModel BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream.
   * @summary Bootstrap download of initial data (Obsolete)
   * @param {SyncBootstrapItemsRequestModel} model Parameters
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SyncApi
   */
  public syncBootStrapObsolete(model: SyncBootstrapItemsRequestModel, options?: any) {
    return SyncApiFp(this.configuration).syncBootStrapObsolete(model, options)(this.fetch, this.basePath);
  }

  /**
   * Streams a sequence of ItemVersion BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream. This endpoint will return all the items matching the query (and the children down the specified graphs) that were edited after the delta date. It will also return all the ids of items still matching the query (and the children down the specified graphs) that were not edited. This means that all the item ids NOT returned have to assumed either having been delete or not matching the query anymore, which means they can be removed from the remote db that is been synced using this endpoint
   * @summary Download of delta data
   * @param {SyncDeltaItemsRequestModel} model Parameters
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SyncApi
   */
  public syncDelta(model: SyncDeltaItemsRequestModel, options?: any) {
    return SyncApiFp(this.configuration).syncDelta(model, options)(this.fetch, this.basePath);
  }

  /**
   * Streams a sequence of ItemWebModel BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream. This endpoint will return all the items matching the query (and the children down the specified graphs) that were edited after the delta date. It will also return all the ids of items still matching the query (and the children down the specified graphs) that were not edited. This means that all the item ids NOT returned have to assumed either having been delete or not matching the query anymore, which means they can be removed from the remote db that is been synced using this endpoint
   * @summary Download of delta data
   * @param {SyncDeltaItemsRequestModel} model Parameters
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SyncApi
   */
  public syncDeltaObsolete(model: SyncDeltaItemsRequestModel, options?: any) {
    return SyncApiFp(this.configuration).syncDeltaObsolete(model, options)(this.fetch, this.basePath);
  }

}
