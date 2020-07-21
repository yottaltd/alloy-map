import { BaseAPI } from './BaseAPI';
import { ItemLogQueryWebRequestModel } from './ItemLogQueryWebRequestModel';
import { ItemLogApiFp } from './ItemLogApiFp';
/**
 * ItemLogApi - object-oriented interface
 * @export
 * @class ItemLogApi
 * @extends {BaseAPI}
 */
export class ItemLogApi extends BaseAPI {
  /**
   * Retrieve the item log related to a specific design to get the audit history for that design
   * @summary List the item logs on a design
   * @param {string} designCode The Guc of the design whose related item logs need to be fetched
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ItemLogApi
   */
  public itemLogListItemLogsByDesignCode(designCode: string, page?: number, pageSize?: number, options?: any) {
    return ItemLogApiFp(this.configuration).itemLogListItemLogsByDesignCode(designCode, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Retrieve the item log related to a specific item to get the audit history for that item
   * @summary List the item logs on an item
   * @param {string} itemId The AId of the item whose related logs need to be fetched
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ItemLogApi
   */
  public itemLogListItemLogsByItemId(itemId: string, page?: number, pageSize?: number, options?: any) {
    return ItemLogApiFp(this.configuration).itemLogListItemLogsByItemId(itemId, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Query the item logs The  of the item whose related logs need to be fetched The model containing the info for the operation
   * @param {string} itemId 
   * @param {ItemLogQueryWebRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ItemLogApi
   */
  public itemLogQueryItemLog(itemId: string, model: ItemLogQueryWebRequestModel, options?: any) {
    return ItemLogApiFp(this.configuration).itemLogQueryItemLog(itemId, model, options)(this.fetch, this.basePath);
  }

}
