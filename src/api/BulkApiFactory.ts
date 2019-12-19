// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { DeleteItemsBulkActionWebRequestModel } from './DeleteItemsBulkActionWebRequestModel';
import { EditItemsBulkActionWebRequestModel } from './EditItemsBulkActionWebRequestModel';
import { ItemBulkWebRequestModel } from './ItemBulkWebRequestModel';
import { TouchItemsBulkActionWebRequestModel } from './TouchItemsBulkActionWebRequestModel';
import { BulkApiFp } from './BulkApiFp';
import { BulkApi } from './BulkApi';
/**
 * BulkApi - factory interface
 * @export
 */
export const BulkApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * This operation allows to delete the items matching the specified Aqs query
     * @summary Submit a bulk delete item action
     * @param {DeleteItemsBulkActionWebRequestModel} model The model containing the info needed for the delete items bulk operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkDeleteItems(model: DeleteItemsBulkActionWebRequestModel, options?: any) {
      return BulkApiFp(configuration).bulkDeleteItems(model, options)(fetch, basePath);
    },
    /**
     * This operation allows to edit a specific set of attributes and properties on the items matching the specified Aqs query
     * @summary Submit a bulk item edit operation
     * @param {EditItemsBulkActionWebRequestModel} model The model containing the info needed for the edit items bulk operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkEditItems(model: EditItemsBulkActionWebRequestModel, options?: any) {
      return BulkApiFp(configuration).bulkEditItems(model, options)(fetch, basePath);
    },
    /**
     * Accepts a list of Create, Edit and Delete operations, using the same models as the respective item APIs, performing bulked operations. Any errors will be returned in the response model. This endpoint is NOT meant to replace the import process and does not guarantee transactional integrity. Moreover the endpoint does not accept more than 1000 requests.
     * @summary Performs many item CUD operations
     * @param {ItemBulkWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkGeneric(model: ItemBulkWebRequestModel, options?: any) {
      return BulkApiFp(configuration).bulkGeneric(model, options)(fetch, basePath);
    },
    /**
     * Fetches a bulk action by its Alloy Id (AId)
     * @summary Get a bulk action by its id
     * @param {string} id The AId for the bulk action
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkGet(id: string, options?: any) {
      return BulkApiFp(configuration).bulkGet(id, options)(fetch, basePath);
    },
    /**
     * Fetches a list of bulk action errors, optionally specifying page and the number of results to return per page.
     * @summary Get a list of bulk action errors
     * @param {string} id The AId for the bulk action
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkListErrors(id: string, page?: number, pageSize?: number, options?: any) {
      return BulkApiFp(configuration).bulkListErrors(id, page, pageSize, options)(fetch, basePath);
    },
    /**
     * This operation allows to touch the items matching the specified Aqs query
     * @summary Submit a bulk touch item action
     * @param {TouchItemsBulkActionWebRequestModel} model The model containing the info needed for the touch items bulk operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkTouchItems(model: TouchItemsBulkActionWebRequestModel, options?: any) {
      return BulkApiFp(configuration).bulkTouchItems(model, options)(fetch, basePath);
    },
  };
};
