import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { WorkflowActionGroupAddActionWebRequestModel } from './WorkflowActionGroupAddActionWebRequestModel';
import { WorkflowActionGroupAddActionWebResponseModel } from './WorkflowActionGroupAddActionWebResponseModel';
import { WorkflowActionGroupCreateWebRequestModel } from './WorkflowActionGroupCreateWebRequestModel';
import { WorkflowActionGroupEditActionWebRequestModel } from './WorkflowActionGroupEditActionWebRequestModel';
import { WorkflowActionGroupEditActionWebResponseModel } from './WorkflowActionGroupEditActionWebResponseModel';
import { WorkflowActionGroupEditWebRequestModel } from './WorkflowActionGroupEditWebRequestModel';
import { WorkflowActionGroupGetActionParametersWebRequestModel } from './WorkflowActionGroupGetActionParametersWebRequestModel';
import { WorkflowActionGroupGetActionParametersWebResponseModel } from './WorkflowActionGroupGetActionParametersWebResponseModel';
import { WorkflowActionGroupGetAllowedActionsWebRequestModel } from './WorkflowActionGroupGetAllowedActionsWebRequestModel';
import { WorkflowActionGroupGetAllowedActionsWebResponseModel } from './WorkflowActionGroupGetAllowedActionsWebResponseModel';
import { WorkflowActionGroupGetWebResponseModel } from './WorkflowActionGroupGetWebResponseModel';
import { WorkflowActionGroupPermissionsEditWebRequestModel } from './WorkflowActionGroupPermissionsEditWebRequestModel';
import { WorkflowActionGroupPermissionsGetWebResponseModel } from './WorkflowActionGroupPermissionsGetWebResponseModel';
import { WorkflowActionGroupRemoveActionWebRequestModel } from './WorkflowActionGroupRemoveActionWebRequestModel';
import { WorkflowActionGroupRemoveActionWebResponseModel } from './WorkflowActionGroupRemoveActionWebResponseModel';
import { WorkflowActionGroupWithOperationsSummaryWebResponseModel } from './WorkflowActionGroupWithOperationsSummaryWebResponseModel';
import { WorkflowActionGroupAccessAdvisorByRoleListWebResponseModel } from './WorkflowActionGroupAccessAdvisorByRoleListWebResponseModel';
import { WorkflowActionGroupAccessAdvisorByUserListWebResponseModel } from './WorkflowActionGroupAccessAdvisorByUserListWebResponseModel';
import { WorkflowActionGroupListWebResponseModel } from './WorkflowActionGroupListWebResponseModel';
import { WorkflowActionGroupApiFetchParamCreator } from './WorkflowActionGroupApiFetchParamCreator';
import { WorkflowActionGroupApi } from './WorkflowActionGroupApi';
/**
 * WorkflowActionGroupApi - functional programming interface
 * @export
 */
export const WorkflowActionGroupApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Add an action to a workflowActionGroup
     * @param {string} code The code of the workflowActionGroup to add the action to
     * @param {WorkflowActionGroupAddActionWebRequestModel} model The model containing all the add action operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupAddAction(code: string, model: WorkflowActionGroupAddActionWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupAddActionWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupAddAction(code, model, options);
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
     * 
     * @summary Create a workflowActionGroup
     * @param {WorkflowActionGroupCreateWebRequestModel} model The model containing all the create operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupCreate(model: WorkflowActionGroupCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupCreate(model, options);
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
     * 
     * @summary Delete a workflowActionGroup
     * @param {string} code The code of the workflowActionGroup to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupDelete(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupDelete(code, options);
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
     * 
     * @summary Edit a workflowActionGroup
     * @param {string} code The code of the workflowActionGroup to edit
     * @param {WorkflowActionGroupEditWebRequestModel} model The model containing all the edit operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupEdit(code: string, model: WorkflowActionGroupEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupEdit(code, model, options);
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
     * 
     * @summary Edit an action on a workflowActionGroup
     * @param {string} code The code of the workflowActionGroup to edit the action on
     * @param {string} id The id of the action to edit
     * @param {WorkflowActionGroupEditActionWebRequestModel} model The model containing all the edit action operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupEditAction(code: string, id: string, model: WorkflowActionGroupEditActionWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupEditActionWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupEditAction(code, id, model, options);
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
     * Edit the permissions on the workflowActionGroup with the specified code
     * @summary Edit permissions for a workflowActionGroup
     * @param {string} code The Guc of the workflowActionGroup to edit the permissions of
     * @param {WorkflowActionGroupPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupEditPermissions(code: string, model: WorkflowActionGroupPermissionsEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupEditPermissions(code, model, options);
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
     * 
     * @summary Get a workflowActionGroup
     * @param {string} code The Guc of the workflowActionGroup to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupGetWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupGet(code, options);
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
     * Given an action type, position in workflow action group, and values, get information about extra parameters that need to be supplied (and if any are optional since they can be inferred by the system) in this case.
     * @summary List the parameters for the specified action.
     * @param {string} code The code of the workflowActionGroup being queried
     * @param {WorkflowActionGroupGetActionParametersWebRequestModel} model Model containing the details of the get parameters request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupGetActionParameters(code: string, model: WorkflowActionGroupGetActionParametersWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupGetActionParametersWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupGetActionParameters(code, model, options);
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
     * 
     * @summary List the actions that are valid to be added to this location in a workflow action group.
     * @param {string} code The code of the workflowActionGroup being queried
     * @param {WorkflowActionGroupGetAllowedActionsWebRequestModel} model Model containing the details of the get allowed actions request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupGetAllowedActions(code: string, model: WorkflowActionGroupGetAllowedActionsWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupGetAllowedActionsWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupGetAllowedActions(code, model, options);
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
     * Fetches the permissions of a workflowActionGroup by its Guc
     * @summary Get a workflowActionGroup permissions by its code
     * @param {string} code The Guc for the workflowActionGroup whose permissions are being requested
     * @param {string} [username] Optional username to get permissions for the specific user. This value is mutually exclusive with Role.
     * @param {string} [role] Optional role to get permissions for the specific role. This value is mutually exclusive with Username.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupGetPermissions(code: string, username?: string, role?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupPermissionsGetWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupGetPermissions(code, username, role, options);
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
     * 
     * @summary List workflowActionGroups
     * @param {string} [name] The optional workflow Action Group name (full or partial) to filter on
     * @param {'Core' | 'Module' | 'Customer'} [context] The optional workflow Action Group context to filter on
     * @param {string} [userGroup] Optional Guc to filter workflow Action Groups by. If specified, only the workflow action groups that have this user group code within their permissions are returned
     * @param {string} [actionGroupInputCode] Optional Guc to filter workflow action groups by. If specified, only the workflow action groups that have this dodi code as their declared input type are returned
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupList(name?: string, context?: 'Core' | 'Module' | 'Customer', userGroup?: string, actionGroupInputCode?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupListWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupList(name, context, userGroup, actionGroupInputCode, page, pageSize, options);
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
     * 
     * @summary Remove an action on a workflowActionGroup
     * @param {string} code The code of the workflowActionGroup to remove the action from
     * @param {string} id The id of the action to remove
     * @param {WorkflowActionGroupRemoveActionWebRequestModel} model The model containing all the remove action operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupRemoveAction(code: string, id: string, model: WorkflowActionGroupRemoveActionWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupRemoveActionWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupRemoveAction(code, id, model, options);
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
     * Fetches a list of workflowActionGroups with winning permission optionally specifying page and the number of results to return per page.
     * @summary Use api/workflow-action-group/access-advisor/user/{username} instead
     * @param {string} username The name of the user to get workflowActionGroup access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupWorkflowActionGroupAccessAdvisor(username: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupAccessAdvisorByUserListWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupWorkflowActionGroupAccessAdvisor(username, query, page, pageSize, options);
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
     * Fetches a list of workflowActionGroups with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists role workflowActionGroups with their winning permission
     * @param {string} code The code of the role to get workflowActionGroup access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupWorkflowActionGroupAccessAdvisorByRole(code: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupAccessAdvisorByRoleListWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupWorkflowActionGroupAccessAdvisorByRole(code, query, page, pageSize, options);
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
     * Fetches a list of workflowActionGroups with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists user workflowActionGroups with their winning permission
     * @param {string} username The name of the user to get workflowActionGroup access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupWorkflowActionGroupAccessAdvisorByUser(username: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<WorkflowActionGroupAccessAdvisorByUserListWebResponseModel> {
      const localVarFetchArgs = WorkflowActionGroupApiFetchParamCreator(configuration).workflowActionGroupWorkflowActionGroupAccessAdvisorByUser(username, query, page, pageSize, options);
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
