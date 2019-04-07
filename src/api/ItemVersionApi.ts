// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ItemVersionGetWebRequestModel } from './ItemVersionGetWebRequestModel';
import { ItemVersionApiFp } from './ItemVersionApiFp';
/**
 * ItemVersionApi - object-oriented interface
 * @export
 * @class ItemVersionApi
 * @extends {BaseAPI}
 */
export class ItemVersionApi extends BaseAPI {
  /**
   * Gets the item version that matches the specified id.
   * @summary Gets an item version by id
   * @param {string} itemId The AId of the item whose version needs to be retrieved
   * @param {ItemVersionGetWebRequestModel} model The model containing the information necessary to the get operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ItemVersionApi
   */
  public itemVersionGet(itemId: string, model: ItemVersionGetWebRequestModel, options?: any) {
    return ItemVersionApiFp(this.configuration).itemVersionGet(itemId, model, options)(this.fetch, this.basePath);
  }

  /**
   * List the versions of the item matching the id specified, in ascending order by start date
   * @summary List the item versions for a specific item
   * @param {string} id The AId of the item whose versions need to be retrieved
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ItemVersionApi
   */
  public itemVersionListByItem(id: string, page?: number, pageSize?: number, options?: any) {
    return ItemVersionApiFp(this.configuration).itemVersionListByItem(id, page, pageSize, options)(this.fetch, this.basePath);
  }

}
