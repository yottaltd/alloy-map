// tslint:disable
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
import { CardQueryDeleteWebRequestModel } from './CardQueryDeleteWebRequestModel';
import { CardWithOperationsSummaryWebResponseModel } from './CardWithOperationsSummaryWebResponseModel';
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
     * Creates a card based on the information sent in the model
     * @summary Create a card
     * @param {CardCreateWebRequestModel} model Model containing the new card details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardCreate(model: CardCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardCreate(model, options);
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
     * Adds a query to the specified card. A card accepts Aqs Query and MathAggregation. If it is a MathAggregation, the result of the query is used, if it is an Aqs Query, the total numbers of matched items is used instead
     * @summary Add a query to a card
     * @param {string} code The Guc of the card to add a query to
     * @param {CardQueryCreateWebModel} model Model containing the information of the query to be added
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardCreateQuery(code: string, model: CardQueryCreateWebModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardCreateQuery(code, model, options);
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
     * Deletes a card based on the information sent in the model
     * @summary Delete a card
     * @param {string} code The Guc of the card to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardDelete(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardDelete(code, options);
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
     * Edits a card based on the information sent in the model
     * @summary Edit a card
     * @param {string} code The Guc of the card to edit
     * @param {CardEditWebRequestModel} model Model containing the new card details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardEdit(code: string, model: CardEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardEdit(code, model, options);
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
     * Edit the permissions on the card with the specified code
     * @summary Edit permissions for a card
     * @param {string} code The Guc of the card to edit the permissions of
     * @param {CardPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardEditPermissions(code: string, model: CardPermissionsEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardEditPermissions(code, model, options);
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
     * Fetches a card by its globally unique code (Guc).
     * @summary Get a card by its code
     * @param {string} code The Guc for the card being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardGet(code, options);
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
     * Computes the result of the queries in the card matching the specified code and returns them in the response
     * @summary Get a computed card
     * @param {string} code The Guc of the card to process
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardGetComputedCard(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardComputedGetWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardGetComputedCard(code, options);
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
     * Fetches the permissions of a card by its Guc
     * @summary Get a card permissions by its code
     * @param {string} code The Guc for the card whose permissions are being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardGetPermissions(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardPermissionsGetWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardGetPermissions(code, options);
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
     * Fetches a list of cards optionally specifying page and the number of results to return per page.
     * @summary Get a list of cards
     * @param {string} [query] Optional query to filter the cards by
     * @param {string} [userGroup] Optional Guc to filter cards by. If specified, only the cards that have this user group code within their permissions are returned
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cardList(query?: string, userGroup?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CardListWebResponseModel> {
      const localVarFetchArgs = CardApiFetchParamCreator(configuration).cardList(query, userGroup, page, pageSize, options);
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
