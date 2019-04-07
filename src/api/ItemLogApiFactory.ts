// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ItemLogApiFp } from './ItemLogApiFp';
import { ItemLogApi } from './ItemLogApi';
/**
 * ItemLogApi - factory interface
 * @export
 */
export const ItemLogApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Retrieve the item log related to a specific design to get the audit history for that design
     * @summary List the item logs on a design
     * @param {string} designCode The Guc of the design whose related item logs need to be fetched
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemLogListItemLogsByDesignCode(designCode: string, page?: number, pageSize?: number, options?: any) {
      return ItemLogApiFp(configuration).itemLogListItemLogsByDesignCode(designCode, page, pageSize, options)(fetch, basePath);
    },
    /**
     * Retrieve the item log related to a specific item to get the audit history for that item
     * @summary List the item logs on an item
     * @param {string} itemId The AId of the item whose related logs need to be fetched
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemLogListItemLogsByItemId(itemId: string, page?: number, pageSize?: number, options?: any) {
      return ItemLogApiFp(configuration).itemLogListItemLogsByItemId(itemId, page, pageSize, options)(fetch, basePath);
    },
  };
};
