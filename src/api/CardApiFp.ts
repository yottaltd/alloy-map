import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { CardComputedGetWebResponseModel } from './CardComputedGetWebResponseModel';
import { CardCreateWebRequestModel } from './CardCreateWebRequestModel';
import { CardEditWebRequestModel } from './CardEditWebRequestModel';
import { CardPermissionsEditWebRequestModel } from './CardPermissionsEditWebRequestModel';
import { CardPermissionsGetWebResponseModel } from './CardPermissionsGetWebResponseModel';
import { CardQueryCreateWebModel } from './CardQueryCreateWebModel';
import { CardQueryCreateWebResponseModel } from './CardQueryCreateWebResponseModel';
import { CardQueryDeleteWebRequestModel } from './CardQueryDeleteWebRequestModel';
import { CardQueryEditWebRequestModel } from './CardQueryEditWebRequestModel';
import { CardWithOperationsSummaryWebResponseModel } from './CardWithOperationsSummaryWebResponseModel';
import { CardWithPermissionsWebResponseModel } from './CardWithPermissionsWebResponseModel';
import { CardAccessAdvisorByRoleListWebResponseModel } from './CardAccessAdvisorByRoleListWebResponseModel';
import { CardAccessAdvisorByUserListWebResponseModel } from './CardAccessAdvisorByUserListWebResponseModel';
import { CardListWebResponseModel } from './CardListWebResponseModel';
import { CardApiFetchParamCreator } from './CardApiFetchParamCreator';
import { CardApi } from './CardApi';
/**
 * CardApi - functional programming interface
 * @export
 */
export const CardApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Fetches a list of cards with winning permission optionally specifying page and the number of results to return per page.
     * @summary Use api/card/access-advisor/user/{username} instead
     * @param {string} username The name of the user to get card access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardCardAccessAdvisor(username: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardAccessAdvisorByUserListWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardCardAccessAdvisor(username, query, page, pageSize, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Fetches a list of cards with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists role cards with their winning permission
     * @param {string} code The code of the role to get card access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardCardAccessAdvisorByRole(code: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardAccessAdvisorByRoleListWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardCardAccessAdvisorByRole(code, query, page, pageSize, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Fetches a list of cards with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists user cards with their winning permission
     * @param {string} username The name of the user to get card access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardCardAccessAdvisorByUser(username: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardAccessAdvisorByUserListWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardCardAccessAdvisorByUser(username, query, page, pageSize, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Creates a card based on the information sent in the model
     * @summary Create a card
     * @param {CardCreateWebRequestModel} model Model containing the new card details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardCreate(model: CardCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardCreate(model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Adds a query to the specified card. A card accepts Aqs Query and MathAggregation. If it is a MathAggregation, the result of the query is used, if it is an Aqs Query, the total numbers of matched items is used instead
     * @summary Add a query to a card
     * @param {string} code The Guc of the card to add a query to
     * @param {CardQueryCreateWebModel} model Model containing the information of the query to be added
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardCreateQuery(code: string, model: CardQueryCreateWebModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardQueryCreateWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardCreateQuery(code, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Deletes a card based on the information sent in the model
     * @summary Delete a card
     * @param {string} code The Guc of the card to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardDelete(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardDelete(code, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
    /**
     * Removes a query to the specified card
     * @summary Remove a query from a card
     * @param {string} code The Guc of the card to remove a query from
     * @param {string} id The AId of the query to remove
     * @param {CardQueryDeleteWebRequestModel} model The model containing the signature necessary to delete a query from the card
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardDeleteQuery(code: string, id: string, model: CardQueryDeleteWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardDeleteQuery(code, id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Edits a card based on the information sent in the model
     * @summary Edit a card
     * @param {string} code The Guc of the card to edit
     * @param {CardEditWebRequestModel} model Model containing the new card details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardEdit(code: string, model: CardEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardEdit(code, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Edit the permissions on the card with the specified code
     * @summary Edit permissions for a card
     * @param {string} code The Guc of the card to edit the permissions of
     * @param {CardPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardEditPermissions(code: string, model: CardPermissionsEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardWithPermissionsWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardEditPermissions(code, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Edits a card query using the information provided in the model
     * @summary Edit a card query
     * @param {string} code The Guc of the card to edit the query
     * @param {string} id The id of the card query to edit
     * @param {CardQueryEditWebRequestModel} model The card query edit model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardEditQuery(code: string, id: string, model: CardQueryEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardEditQuery(code, id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Fetches a card by its globally unique code (Guc).
     * @summary Get a card by its code
     * @param {string} code The Guc for the card being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardGet(code, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Computes or returns the result of the queries in the card matching the specified code
     * @summary Get a computed card
     * @param {string} code The Guc of the card to process
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardGetComputedCard(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardComputedGetWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardGetComputedCard(code, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Fetches the permissions of a card by its Guc
     * @summary Get a card permissions by its code
     * @param {string} code The Guc for the card whose permissions are being requested
     * @param {string} [username] Optional username to get permissions for the specific user. This value is mutually exclusive with Role.
     * @param {string} [role] Optional role to get permissions for the specific role. This value is mutually exclusive with Username.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardGetPermissions(code: string, username?: string, role?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardPermissionsGetWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardGetPermissions(code, username, role, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Fetches a list of cards optionally specifying page and the number of results to return per page.
     * @summary Get a list of cards
     * @param {string} [query] Optional query to filter the cards by
     * @param {string} [userGroup] Optional Guc to filter cards by. If specified, only the cards that have this user group code within their permissions are returned
     * @param {'Core' | 'Module' | 'Customer'} [context] The optional cards context to filter on
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardList(query?: string, userGroup?: string, context?: 'Core' | 'Module' | 'Customer', page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardListWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardList(query, userGroup, context, page, pageSize, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
  }
};
