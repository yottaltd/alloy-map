// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemCreateWebResponseModel } from './ItemCreateWebResponseModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { ItemEditWebResponseModel } from './ItemEditWebResponseModel';
import { ItemGetWebResponseModel } from './ItemGetWebResponseModel';
import { ItemGraphGetWebResponseModel } from './ItemGraphGetWebResponseModel';
import { ItemParentsGetWebResponseModel } from './ItemParentsGetWebResponseModel';
import { ItemApiFetchParamCreator } from './ItemApiFetchParamCreator';
import { ItemApi } from './ItemApi';
/**
 * ItemApi - functional programming interface
 * @export
 */
export const ItemApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Creates a new item in the provided design and collection using the current date and time as its start date and leaving the end date open. For more control over the start and end date, the design needs to be versioned and the item version api has to be used
     * @summary Creates an item
     * @param {ItemCreateWebRequestModel} model The models containing the info about the item to be created
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemCreate(model: ItemCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemCreateWebResponseModel> {
      const localVarFetchArgs = ItemApiFetchParamCreator(configuration).itemCreate(model, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * This endpoint is used to completely and irreversibly delete an item by its id. In case the item has multiple versions (if it belongs to a versioned design), then ALL the versions will disappear.
     * @summary Deletes an item by id
     * @param {string} id The AId of the item to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemDelete(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ItemApiFetchParamCreator(configuration).itemDelete(id, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * The behaviour of this endpoint differs depending on whether a design is versioned or non versioned. For a non versioned design there is only one version of an item, and thus the edit operation will be applied to that version editing its properties and attributes. For a versioned design, however, what it actually happens is the creation of a new version of the item being edited with the new properties and attributes. The current version is then end dated by changing its End date property to the date of the edit operation. If an attribute is not specified or the value is the same as the previous one, its value will be left unchanged, otherwise its value will be replaced by the provided one
     * @summary Edits the item by id
     * @param {string} id The AId of the item to edit
     * @param {ItemEditWebRequestModel} model The model containing the info to edit the item
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemEdit(id: string, model: ItemEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemEditWebResponseModel> {
      const localVarFetchArgs = ItemApiFetchParamCreator(configuration).itemEdit(id, model, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Gets the item that matches the specified id. If the design is versioned, thus multiple versions for the same item matching the id are present, the current version is returned. The item version api has to be used in case an older version is needed
     * @summary Gets an item by id
     * @param {string} id The AId of the item to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemGet(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemGetWebResponseModel> {
      const localVarFetchArgs = ItemApiFetchParamCreator(configuration).itemGet(id, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Gets the item graph for the specified item id and graph code.
     * @summary Gets an item graph by id and code
     * @param {string} id The AId of the item to retrieve
     * @param {string} code The code of the graph to retrieve for example \&quot;Component\&quot;, \&quot;Job\&quot;, \&quot;Lookup\&quot;, \&quot;Network\&quot;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemGetItemGraph(id: string, code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemGraphGetWebResponseModel> {
      const localVarFetchArgs = ItemApiFetchParamCreator(configuration).itemGetItemGraph(id, code, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Gets all parents items for the item filtered on optional attribute and graph codes. If none of the optional parameters is set it returns all parents for the item.
     * @summary Gets an item parents
     * @param {string} id The AId of the item to retrieve parents for
     * @param {string} [attributeCode] Optional attribute code to filter parents on
     * @param {string} [graphCode] Optional graph code to filter parents on
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemGetItemParents(id: string, attributeCode?: string, graphCode?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemParentsGetWebResponseModel> {
      const localVarFetchArgs = ItemApiFetchParamCreator(configuration).itemGetItemParents(id, attributeCode, graphCode, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
  }
};
