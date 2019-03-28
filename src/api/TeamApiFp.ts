// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemCreateWebResponseModel } from './ItemCreateWebResponseModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { ItemEditWebResponseModel } from './ItemEditWebResponseModel';
import { TeamApiFetchParamCreator } from './TeamApiFetchParamCreator';
import { TeamApi } from './TeamApi';
/**
 * TeamApi - functional programming interface
 * @export
 */
export const TeamApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Creates a team item based on the information sent in the model
     * @summary Create a team
     * @param {ItemCreateWebRequestModel} model Model containing the team details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    teamCreate(model: ItemCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemCreateWebResponseModel> {
      const localVarFetchArgs = TeamApiFetchParamCreator(configuration).teamCreate(model, options);
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
     * Delete the team item and recalculate costs of all job work items on jobs that were assigned to this team
     * @summary Deletes a team by id and updates job costs
     * @param {string} id The AId of the team to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    teamDelete(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = TeamApiFetchParamCreator(configuration).teamDelete(id, options);
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
     * Edits a team item based on the information sent in the model
     * @summary Edits the team item by id
     * @param {string} id The AId of the team item to edit
     * @param {ItemEditWebRequestModel} model The model containing the info to edit the team item
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    teamEdit(id: string, model: ItemEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemEditWebResponseModel> {
      const localVarFetchArgs = TeamApiFetchParamCreator(configuration).teamEdit(id, model, options);
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
