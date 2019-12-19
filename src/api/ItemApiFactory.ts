// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ItemCloneWebRequestModel } from './ItemCloneWebRequestModel';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { ItemApiFp } from './ItemApiFp';
import { ItemApi } from './ItemApi';
/**
 * ItemApi - factory interface
 * @export
 */
export const ItemApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Create a copy of an existing item.  If the item is in the template collection, then template logic will be used to deep copy any child items that are also in the template collection, as well as maintaining any existing links to parent items.
     * @summary Clones an item
     * @param {string} id The AId item id of the item to clone
     * @param {ItemCloneWebRequestModel} model The models containing the info about the item to be cloned
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemClone(id: string, model: ItemCloneWebRequestModel, options?: any) {
      return ItemApiFp(configuration).itemClone(id, model, options)(fetch, basePath);
    },
    /**
     * Creates a new item in the provided design and collection using the current date and time as its start date and leaving the end date open. For more control over the start and end date, the design needs to be versioned and the item version api has to be used
     * @summary Creates an item
     * @param {ItemCreateWebRequestModel} model The models containing the info about the item to be created
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemCreate(model: ItemCreateWebRequestModel, options?: any) {
      return ItemApiFp(configuration).itemCreate(model, options)(fetch, basePath);
    },
    /**
     * This endpoint is used to completely and irreversibly delete an item by its id. In case the item has multiple versions (if it belongs to a versioned design), then ALL the versions will disappear.
     * @summary Deletes an item by id
     * @param {string} id The AId of the item to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemDelete(id: string, options?: any) {
      return ItemApiFp(configuration).itemDelete(id, options)(fetch, basePath);
    },
    /**
     * The behaviour of this endpoint differs depending on whether a design is versioned or non versioned. For a non versioned design there is only one version of an item, and thus the edit operation will be applied to that version editing its properties and attributes. For a versioned design, however, what it actually happens is the creation of a new version of the item being edited with the new properties and attributes. The current version is then end dated by changing its End date property to the date of the edit operation.  If an attribute is not specified or the value is the same as the previous one, its value will be left unchanged, otherwise its value will be replaced by the provided one.  If the geometry field is passed as null, the item geometry will be left unchanged. To unset geometry, pass null for the geometry field and also set a null value for the attributes_itemsGeometry attribute
     * @summary Edits the item by id
     * @param {string} id The AId of the item to edit
     * @param {ItemEditWebRequestModel} model The model containing the info to edit the item
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemEdit(id: string, model: ItemEditWebRequestModel, options?: any) {
      return ItemApiFp(configuration).itemEdit(id, model, options)(fetch, basePath);
    },
    /**
     * Gets the item that matches the specified id. If the design is versioned, thus multiple versions for the same item matching the id are present, the current version is returned. The item version api has to be used in case an older version is needed
     * @summary Gets an item by id
     * @param {string} id The AId of the item to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemGet(id: string, options?: any) {
      return ItemApiFp(configuration).itemGet(id, options)(fetch, basePath);
    },
    /**
     * Gets the item graph for the specified item id and graph code.
     * @summary Gets an item graph by id and code
     * @param {string} id The AId of the item to retrieve
     * @param {string} code The code of the graph to retrieve for example \&quot;Component\&quot;, \&quot;Job\&quot;, \&quot;Lookup\&quot;, \&quot;Network\&quot;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemGetItemGraph(id: string, code: string, options?: any) {
      return ItemApiFp(configuration).itemGetItemGraph(id, code, options)(fetch, basePath);
    },
    /**
     * Gets all parents items for the item filtered on optional attribute and graph codes. If none of the optional parameters is set it returns all parents for the item.
     * @summary Gets an item parents
     * @param {string} id The AId of the item to retrieve parents for
     * @param {string} [attributeCode] Optional attribute code to filter parents on
     * @param {string} [graphCode] Optional graph code to filter parents on
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemGetItemParents(id: string, attributeCode?: string, graphCode?: string, page?: number, pageSize?: number, options?: any) {
      return ItemApiFp(configuration).itemGetItemParents(id, attributeCode, graphCode, page, pageSize, options)(fetch, basePath);
    },
    /**
     * Refreshes any out of date computed data on the item that has no been updated automatically
     * @summary Touches the item by id
     * @param {string} id The AId of the item to touch
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemTouch(id: string, options?: any) {
      return ItemApiFp(configuration).itemTouch(id, options)(fetch, basePath);
    },
  };
};
