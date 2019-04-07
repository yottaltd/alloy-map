// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemCreateWebResponseModel } from './ItemCreateWebResponseModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { ItemEditWebResponseModel } from './ItemEditWebResponseModel';
import { ProjectCloseWebRequestModel } from './ProjectCloseWebRequestModel';
import { ProjectApiFetchParamCreator } from './ProjectApiFetchParamCreator';
import { ProjectApi } from './ProjectApi';
/**
 * ProjectApi - functional programming interface
 * @export
 */
export const ProjectApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Closes a project item based on the information sent in the model
     * @summary Closes a project
     * @param {string} id The AId of the project to close
     * @param {ProjectCloseWebRequestModel} model Model containing the info for the project close operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectCloseProject(id: string, model: ProjectCloseWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ProjectApiFetchParamCreator(configuration).projectCloseProject(id, model, options);
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
     * Creates a project item based on the information sent in the model
     * @summary Create a project
     * @param {ItemCreateWebRequestModel} model Model containing the project details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectCreate(model: ItemCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemCreateWebResponseModel> {
      const localVarFetchArgs = ProjectApiFetchParamCreator(configuration).projectCreate(model, options);
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
     * Delete the project item
     * @summary Deletes a project by id
     * @param {string} id The AId of the project to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectDelete(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ProjectApiFetchParamCreator(configuration).projectDelete(id, options);
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
     * Edits a project item based on the information sent in the model
     * @summary Edits the project item by id
     * @param {string} id The AId of the project item to edit
     * @param {ItemEditWebRequestModel} model The model containing the info to edit the project item
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectEdit(id: string, model: ItemEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemEditWebResponseModel> {
      const localVarFetchArgs = ProjectApiFetchParamCreator(configuration).projectEdit(id, model, options);
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
