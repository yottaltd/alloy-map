import { BaseAPI } from './BaseAPI';
import { DeleteItemsBulkActionWebRequestModel } from './DeleteItemsBulkActionWebRequestModel';
import { EditItemsBulkActionWebRequestModel } from './EditItemsBulkActionWebRequestModel';
import { ItemBulkWebRequestModel } from './ItemBulkWebRequestModel';
import { TouchItemsBulkActionWebRequestModel } from './TouchItemsBulkActionWebRequestModel';
import { BulkApiFp } from './BulkApiFp';
/**
 * BulkApi - object-oriented interface
 * @export
 * @class BulkApi
 * @extends {BaseAPI}
 */
export class BulkApi extends BaseAPI {
  /**
   * This operation allows to delete the items matching the specified Aqs query
   * @summary Submit a bulk delete item action
   * @param {DeleteItemsBulkActionWebRequestModel} model The model containing the info needed for the delete items bulk operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BulkApi
   */
  public bulkDeleteItems(model: DeleteItemsBulkActionWebRequestModel, options?: any) {
    return BulkApiFp(this.configuration).bulkDeleteItems(model, options)(this.fetch, this.basePath);
  }

  /**
   * This operation allows to edit a specific set of attributes and properties on the items matching the specified Aqs query
   * @summary Submit a bulk item edit operation
   * @param {EditItemsBulkActionWebRequestModel} model The model containing the info needed for the edit items bulk operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BulkApi
   */
  public bulkEditItems(model: EditItemsBulkActionWebRequestModel, options?: any) {
    return BulkApiFp(this.configuration).bulkEditItems(model, options)(this.fetch, this.basePath);
  }

  /**
   * Accepts a list of Create, Edit and Delete operations, using the same models as the respective item APIs, performing bulked operations. Any errors will be returned in the response model. This endpoint is NOT meant to replace the import process and does not guarantee transactional integrity. Moreover the endpoint does not accept more than 1000 requests.
   * @summary Performs many item CUD operations
   * @param {ItemBulkWebRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BulkApi
   */
  public bulkGeneric(model: ItemBulkWebRequestModel, options?: any) {
    return BulkApiFp(this.configuration).bulkGeneric(model, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a bulk action by its Alloy Id (AId)
   * @summary Get a bulk action by its id
   * @param {string} id The id for the bulk action
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BulkApi
   */
  public bulkGet(id: string, options?: any) {
    return BulkApiFp(this.configuration).bulkGet(id, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of bulk action errors, optionally specifying page and the number of results to return per page.
   * @summary Get a list of bulk action errors
   * @param {string} id The AId for the bulk action
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BulkApi
   */
  public bulkListErrors(id: string, page?: number, pageSize?: number, options?: any) {
    return BulkApiFp(this.configuration).bulkListErrors(id, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * This operation allows to touch the items matching the specified Aqs query
   * @summary Submit a bulk touch item action
   * @param {TouchItemsBulkActionWebRequestModel} model The model containing the info needed for the touch items bulk operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BulkApi
   */
  public bulkTouchItems(model: TouchItemsBulkActionWebRequestModel, options?: any) {
    return BulkApiFp(this.configuration).bulkTouchItems(model, options)(this.fetch, this.basePath);
  }

}
