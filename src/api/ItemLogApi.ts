// tslint:disable
import { BaseAPI } from './BaseAPI';
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
   * @param {number} [page] 
   * @param {number} [pageSize] 
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
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ItemLogApi
   */
  public itemLogListItemLogsByItemId(itemId: string, page?: number, pageSize?: number, options?: any) {
    return ItemLogApiFp(this.configuration).itemLogListItemLogsByItemId(itemId, page, pageSize, options)(this.fetch, this.basePath);
  }

}
