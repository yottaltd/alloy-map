// tslint:disable
import { BaseAPI } from './BaseAPI';
import { SyncBootstrapItemsRequestModel } from './SyncBootstrapItemsRequestModel';
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
   * Streams a sequence of ItemVersion BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream.
   * @summary Bootstrap download of initial data (Obsolete)
   * @param {SyncBootstrapItemsRequestModel} model Parameters
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SyncApi
   */
  public syncBootStrapObsolete(model: SyncBootstrapItemsRequestModel, options?: any) {
    return SyncApiFp(this.configuration).syncBootStrapObsolete(model, options)(this.fetch, this.basePath);
  }

}
