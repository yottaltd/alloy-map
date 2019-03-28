// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { DeleteItemsBulkActionWebRequestModel } from './DeleteItemsBulkActionWebRequestModel';
import { SetAttributesBulkActionWebRequestModel } from './SetAttributesBulkActionWebRequestModel';
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
     * This operation allows to edit a specific set of attributes on the items matching the specified Aqs query
     * @summary Submit a bulk set attributes
     * @param {SetAttributesBulkActionWebRequestModel} model The model containing the info needed for the set attributes items bulk operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkSetAttributes(model: SetAttributesBulkActionWebRequestModel, options?: any) {
      return BulkApiFp(configuration).bulkSetAttributes(model, options)(fetch, basePath);
    },
  };
};
