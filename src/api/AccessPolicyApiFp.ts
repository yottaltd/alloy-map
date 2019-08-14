// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { AccessPolicyCreateWebRequestModel } from './AccessPolicyCreateWebRequestModel';
import { AccessPolicyEditWebRequestModel } from './AccessPolicyEditWebRequestModel';
import { AccessPolicyRuleCreateWebRequestModel } from './AccessPolicyRuleCreateWebRequestModel';
import { AccessPolicyRuleDeleteWebRequestModel } from './AccessPolicyRuleDeleteWebRequestModel';
import { AccessPolicyRuleEditWebRequestModel } from './AccessPolicyRuleEditWebRequestModel';
import { AccessPolicyWebModel } from './AccessPolicyWebModel';
import { AccessPolicyListWebResponseModel } from './AccessPolicyListWebResponseModel';
import { AccessPolicyApiFetchParamCreator } from './AccessPolicyApiFetchParamCreator';
import { AccessPolicyApi } from './AccessPolicyApi';
/**
 * AccessPolicyApi - functional programming interface
 * @export
 */
export const AccessPolicyApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Creates an Access Policy based on the information sent in the model
     * @summary Create an Access Policy
     * @param {AccessPolicyCreateWebRequestModel} model Model containing the new Access Policy details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyCreate(model: AccessPolicyCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AccessPolicyWebModel> {
      const localVarFetchArgs = AccessPolicyApiFetchParamCreator(configuration).accessPolicyCreate(model, options);
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
     * Adds a rule to the specified Access Policy
     * @summary Add a rule to an Access Policy
     * @param {string} code The Guc of the Access Policy to add a rule to
     * @param {AccessPolicyRuleCreateWebRequestModel} model Model containing the information of the rule to be added
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyCreateRule(code: string, model: AccessPolicyRuleCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AccessPolicyWebModel> {
      const localVarFetchArgs = AccessPolicyApiFetchParamCreator(configuration).accessPolicyCreateRule(code, model, options);
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
     * Deletes a Access Policy based on the information sent in the model
     * @summary Delete an Access Policy
     * @param {string} code The Guc of the Access Policy to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyDelete(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = AccessPolicyApiFetchParamCreator(configuration).accessPolicyDelete(code, options);
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
     * Removes a rule to the specified Access Policy
     * @summary Remove a rule from an Access Policy
     * @param {string} code The Guc of the Access Policy to remove a rule from
     * @param {string} id The AId of the rule to remove
     * @param {AccessPolicyRuleDeleteWebRequestModel} model The model containing the signature necessary to delete a rule from the Access Policy
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyDeleteRule(code: string, id: string, model: AccessPolicyRuleDeleteWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AccessPolicyWebModel> {
      const localVarFetchArgs = AccessPolicyApiFetchParamCreator(configuration).accessPolicyDeleteRule(code, id, model, options);
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
     * Edits an Access Policy based on the information sent in the model
     * @summary Edit an Access Policy
     * @param {string} code The Guc of the Access Policy to edit
     * @param {AccessPolicyEditWebRequestModel} model Model containing the new Access Policy details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyEdit(code: string, model: AccessPolicyEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AccessPolicyWebModel> {
      const localVarFetchArgs = AccessPolicyApiFetchParamCreator(configuration).accessPolicyEdit(code, model, options);
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
     * Edit a rule on the specified Access Policy
     * @summary Edit a rule in an Access Policy
     * @param {string} code The Guc of the Access Policy to edit a rule on
     * @param {string} id The AId of the rule to edit
     * @param {AccessPolicyRuleEditWebRequestModel} model The model containing the info necessary to edit a rule on the Access Policy
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyEditRule(code: string, id: string, model: AccessPolicyRuleEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AccessPolicyWebModel> {
      const localVarFetchArgs = AccessPolicyApiFetchParamCreator(configuration).accessPolicyEditRule(code, id, model, options);
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
     * Fetches an Access Policy by its globally unique code (Guc).
     * @summary Get an Access Policy by its code
     * @param {string} code The Guc for the Access Policy being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AccessPolicyWebModel> {
      const localVarFetchArgs = AccessPolicyApiFetchParamCreator(configuration).accessPolicyGet(code, options);
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
     * Fetches a list of Access Policies filtered by the provided parameters
     * @summary Get a list of Access Policies
     * @param {string} [query] Optional query to filter the access policies by
     * @param {Array<string>} [appliesTo] The optional dodi code Guc, if specified, only the designs implementing that interface will be returned
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyList(query?: string, appliesTo?: Array<string>, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AccessPolicyListWebResponseModel> {
      const localVarFetchArgs = AccessPolicyApiFetchParamCreator(configuration).accessPolicyList(query, appliesTo, page, pageSize, options);
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
