// tslint:disable
import { BaseAPI } from './BaseAPI';
import { DeleteItemsBulkActionWebRequestModel } from './DeleteItemsBulkActionWebRequestModel';
import { SetAttributesBulkActionWebRequestModel } from './SetAttributesBulkActionWebRequestModel';
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
   * Fetches a bulk action by its Alloy Id (AId)
   * @summary Get a bulk action by its id
   * @param {string} id The AId for the bulk action
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
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BulkApi
   */
  public bulkListErrors(id: string, page?: number, pageSize?: number, options?: any) {
    return BulkApiFp(this.configuration).bulkListErrors(id, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * This operation allows to edit a specific set of attributes on the items matching the specified Aqs query
   * @summary Submit a bulk set attributes
   * @param {SetAttributesBulkActionWebRequestModel} model The model containing the info needed for the set attributes items bulk operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BulkApi
   */
  public bulkSetAttributes(model: SetAttributesBulkActionWebRequestModel, options?: any) {
    return BulkApiFp(this.configuration).bulkSetAttributes(model, options)(this.fetch, this.basePath);
  }

}
