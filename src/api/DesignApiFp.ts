import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { DesignAddDesignInterfaceWebRequestModel } from './DesignAddDesignInterfaceWebRequestModel';
import { DesignCreateWebRequestModel } from './DesignCreateWebRequestModel';
import { DesignEditWebRequestModel } from './DesignEditWebRequestModel';
import { DesignRemoveDesignInterfaceWebRequestModel } from './DesignRemoveDesignInterfaceWebRequestModel';
import { DesignWithOperationsSummaryWebResponseModel } from './DesignWithOperationsSummaryWebResponseModel';
import { DesignWithPermissionsWebResponseModel } from './DesignWithPermissionsWebResponseModel';
import { DodiAttributeCreateWebRequestModel } from './DodiAttributeCreateWebRequestModel';
import { DodiAttributeCreateWebResponseModel } from './DodiAttributeCreateWebResponseModel';
import { DodiAttributeDeleteWebRequestModel } from './DodiAttributeDeleteWebRequestModel';
import { DodiAttributeEditWebRequestModel } from './DodiAttributeEditWebRequestModel';
import { DodiPermissionsEditWebRequestModel } from './DodiPermissionsEditWebRequestModel';
import { DodiPermissionsGetWebResponseModel } from './DodiPermissionsGetWebResponseModel';
import { DesignListWebResponseModel } from './DesignListWebResponseModel';
import { DodiAccessAdvisorByRoleListWebResponseModel } from './DodiAccessAdvisorByRoleListWebResponseModel';
import { DodiAccessAdvisorByUserListWebResponseModel } from './DodiAccessAdvisorByUserListWebResponseModel';
import { DesignApiFetchParamCreator } from './DesignApiFetchParamCreator';
import { DesignApi } from './DesignApi';
/**
 * DesignApi - functional programming interface
 * @export
 */
export const DesignApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Adds an interface to the design with the specified code. After the interface has been added the design will include all the attributes that are part of that interface. Returns updated design.
     * @summary Add an interface to a design
     * @param {string} code The Guc of the design to add an interface to
     * @param {DesignAddDesignInterfaceWebRequestModel} model The model containing the details of the interface to add
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designAddDesignInterface(code: string, model: DesignAddDesignInterfaceWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DesignWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designAddDesignInterface(code, model, options);
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
     * Creates a design by using the information provided in the model
     * @summary Create a design
     * @param {DesignCreateWebRequestModel} model The model containing all the create details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designCreate(model: DesignCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DesignWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designCreate(model, options);
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
     * Creates a design attribute using the information provided in the model
     * @summary Create a design attribute
     * @param {string} code The Guc of the design to create the attribute
     * @param {DodiAttributeCreateWebRequestModel} model The model containing the details of the attribute to create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designCreateDesignAttribute(code: string, model: DodiAttributeCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DodiAttributeCreateWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designCreateDesignAttribute(code, model, options);
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
     * Deletes the design matching the specified code
     * @summary Delete a design
     * @param {string} code The Guc of the design to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designDelete(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designDelete(code, options);
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
     * Finds and removes the specified attribute from the design with the provided code
     * @summary Delete a design attribute
     * @param {string} code The Guc of the design to delete the attribute from
     * @param {string} attributeCode The Guc of the attribute to delete
     * @param {DodiAttributeDeleteWebRequestModel} model The model containing the signature necessary to delete a design attribute
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designDeleteDesignAttribute(code: string, attributeCode: string, model: DodiAttributeDeleteWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DesignWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designDeleteDesignAttribute(code, attributeCode, model, options);
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
     * Fetches a list of design and its attributes with winning permission optionally specifying page and the number of results to return per page.
     * @summary Use api/design/access-advisor/user/{username} instead
     * @param {string} username The name of the user to get design with attributes access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designDesignAccessAdvisor(username: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DodiAccessAdvisorByUserListWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designDesignAccessAdvisor(username, query, page, pageSize, options);
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
     * Fetches a list of design and its attributes with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists design and its attributes with their winning permission for the role
     * @param {string} code The code of the role to get design with attributes access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designDesignAccessAdvisorByRole(code: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DodiAccessAdvisorByRoleListWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designDesignAccessAdvisorByRole(code, query, page, pageSize, options);
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
     * Fetches a list of design and its attributes with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists design and its attributes with their winning permission for the user
     * @param {string} username The name of the user to get design with attributes access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designDesignAccessAdvisorByUser(username: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DodiAccessAdvisorByUserListWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designDesignAccessAdvisorByUser(username, query, page, pageSize, options);
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
     * Edits the design matching the specified code by using the provided details
     * @summary Edit a design
     * @param {string} code The Guc of the design to edit
     * @param {DesignEditWebRequestModel} model The model containing the edit details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designEdit(code: string, model: DesignEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DesignWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designEdit(code, model, options);
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
     * Edits a design attribute using the information provided in the model
     * @summary Edit a design attribute
     * @param {string} code The Guc of the design to edit the attribute
     * @param {string} attributeCode The code of the attribute to edit
     * @param {DodiAttributeEditWebRequestModel} model The attribute edit model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designEditDesignAttribute(code: string, attributeCode: string, model: DodiAttributeEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DesignWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designEditDesignAttribute(code, attributeCode, model, options);
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
     * Edit the permissions on the design with the specified code. New permissions will replace any existing permissions on both design and its attributes
     * @summary Edit permissions for a design and its attributes
     * @param {string} code The Guc of the design to edit the permissions of
     * @param {DodiPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designEditPermissions(code: string, model: DodiPermissionsEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DesignWithPermissionsWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designEditPermissions(code, model, options);
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
     * Finds a design with the specified code
     * @summary Get a design by its Guc
     * @param {string} code The Guc to use to fetch the required design
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DesignWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designGet(code, options);
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
     * Finds the permissions of a design with the specified code for optional user
     * @summary Get the design permissions
     * @param {string} code The Guc to use to fetch the required design permissions
     * @param {string} [username] Optional username to get permissions for the specific user. This value is mutually exclusive with Role.
     * @param {string} [role] Optional role to get permissions for the specific role. This value is mutually exclusive with Username.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designGetPermissions(code: string, username?: string, role?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DodiPermissionsGetWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designGetPermissions(code, username, role, options);
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
     * List designs with optional filters on Context and a string query
     * @summary List and filter designs
     * @param {string} [query] Optional query to filter the designs by
     * @param {'Core' | 'Module' | 'Customer'} [context] Optional Context filter
     * @param {string} [implementsInterface] The optional dodi code Guc, if specified, only the designs implementing that interface will be returned
     * @param {string} [userGroup] Optional Guc to filter designs by. If specified, only the designs that have this user group code within their permissions or the permissions of the attributes within them are returned
     * @param {string} [childDodi] Optional Guc to filter designs by. If specified, only the designs that have a link attribute pointing to the specified dodi are returned
     * @param {string} [lastEditDate] The optional last edit date to return only designs created or edited after this date
     * @param {boolean} [queryCompleteDodi] Optional boolean that can be set to false to query against designs without taking into account inheritance
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designList(query?: string, context?: 'Core' | 'Module' | 'Customer', implementsInterface?: string, userGroup?: string, childDodi?: string, lastEditDate?: string, queryCompleteDodi?: boolean, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DesignListWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designList(query, context, implementsInterface, userGroup, childDodi, lastEditDate, queryCompleteDodi, page, pageSize, options);
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
     * Removes an interface from the ones the design implements. This does not remove the interface itself from the system. However all the item attributes belonging to the interface being removed will be deleted from all the items belonging to the design. This is an unaudited change and it will not be possible to bring those values back. Returns updated design.
     * @summary Remove an interface from a design
     * @param {string} code The Guc of the design to remove an interface from
     * @param {string} interfaceCode The Guc of the interface to be removed
     * @param {DesignRemoveDesignInterfaceWebRequestModel} model The model containing the signature necessary to remove an interface from a design
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designRemoveDesignInterface(code: string, interfaceCode: string, model: DesignRemoveDesignInterfaceWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DesignWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = DesignApiFetchParamCreator(configuration).designRemoveDesignInterface(code, interfaceCode, model, options);
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
