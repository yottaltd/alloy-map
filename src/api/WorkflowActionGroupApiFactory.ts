// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { WorkflowActionGroupAddActionWebRequestModel } from './WorkflowActionGroupAddActionWebRequestModel';
import { WorkflowActionGroupCreateWebRequestModel } from './WorkflowActionGroupCreateWebRequestModel';
import { WorkflowActionGroupEditActionWebRequestModel } from './WorkflowActionGroupEditActionWebRequestModel';
import { WorkflowActionGroupEditWebRequestModel } from './WorkflowActionGroupEditWebRequestModel';
import { WorkflowActionGroupGetActionParametersWebRequestModel } from './WorkflowActionGroupGetActionParametersWebRequestModel';
import { WorkflowActionGroupGetAllowedActionsWebRequestModel } from './WorkflowActionGroupGetAllowedActionsWebRequestModel';
import { WorkflowActionGroupPermissionsEditWebRequestModel } from './WorkflowActionGroupPermissionsEditWebRequestModel';
import { WorkflowActionGroupRemoveActionWebRequestModel } from './WorkflowActionGroupRemoveActionWebRequestModel';
import { WorkflowActionGroupApiFp } from './WorkflowActionGroupApiFp';
import { WorkflowActionGroupApi } from './WorkflowActionGroupApi';
/**
 * WorkflowActionGroupApi - factory interface
 * @export
 */
export const WorkflowActionGroupApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary Add an action to a workflowActionGroup
     * @param {string} code The code of the workflowActionGroup to add the action to
     * @param {WorkflowActionGroupAddActionWebRequestModel} model The model containing all the add action operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupAddAction(code: string, model: WorkflowActionGroupAddActionWebRequestModel, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupAddAction(code, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Create a workflowActionGroup
     * @param {WorkflowActionGroupCreateWebRequestModel} model The model containing all the create operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupCreate(model: WorkflowActionGroupCreateWebRequestModel, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupCreate(model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Delete a workflowActionGroup
     * @param {string} code The code of the workflowActionGroup to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupDelete(code: string, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupDelete(code, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Edit a workflowActionGroup
     * @param {string} code The code of the workflowActionGroup to edit
     * @param {WorkflowActionGroupEditWebRequestModel} model The model containing all the edit operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupEdit(code: string, model: WorkflowActionGroupEditWebRequestModel, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupEdit(code, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Edit an action on a workflowActionGroup
     * @param {string} code The code of the workflowActionGroup to edit the action on
     * @param {string} id The id of the action to remove
     * @param {WorkflowActionGroupEditActionWebRequestModel} model The model containing all the edit action operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupEditAction(code: string, id: string, model: WorkflowActionGroupEditActionWebRequestModel, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupEditAction(code, id, model, options)(fetch, basePath);
    },
    /**
     * Edit the permissions on the workflowActionGroup with the specified code
     * @summary Edit permissions for a workflowActionGroup
     * @param {string} code The Guc of the workflowActionGroup to edit the permissions of
     * @param {WorkflowActionGroupPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupEditPermissions(code: string, model: WorkflowActionGroupPermissionsEditWebRequestModel, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupEditPermissions(code, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get a workflowActionGroup
     * @param {string} code The Guc of the workflowActionGroup to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupGet(code: string, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupGet(code, options)(fetch, basePath);
    },
    /**
     * Given an action type, position in workflow action group, and values, get information about extra parameters that need to be supplied (and if any are optional since they can be inferred by the system) in this case.
     * @summary List the parameters for the specified action.
     * @param {string} code The code of the workflowActionGroup being queried
     * @param {WorkflowActionGroupGetActionParametersWebRequestModel} model Model containing the details of the get parameters request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupGetActionParameters(code: string, model: WorkflowActionGroupGetActionParametersWebRequestModel, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupGetActionParameters(code, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List the actions that are valid to be added to this location in a workflow action group.
     * @param {string} code The code of the workflowActionGroup being queried
     * @param {WorkflowActionGroupGetAllowedActionsWebRequestModel} model Model containing the details of the get allowed actions request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupGetAllowedActions(code: string, model: WorkflowActionGroupGetAllowedActionsWebRequestModel, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupGetAllowedActions(code, model, options)(fetch, basePath);
    },
    /**
     * Fetches the permissions of a workflowActionGroup by its Guc
     * @summary Get a workflowActionGroup permissions by its code
     * @param {string} code The Guc for the workflowActionGroup whose permissions are being requested
     * @param {string} [username] Optional username to get permissions for the specific user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupGetPermissions(code: string, username?: string, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupGetPermissions(code, username, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List workflowActionGroups
     * @param {string} [name] The optional workflow Action Group name (full or partial) to filter on
     * @param {string} [userGroup] Optional Guc to filter workflow Action Groups by. If specified, only the workflow action groups that have this user group code within their permissions are returned
     * @param {string} [actionGroupInputCode] Optional Guc to filter workflow action groups by. If specified, only the workflow action groups that have this dodi code as their declared input type are returned
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupList(name?: string, userGroup?: string, actionGroupInputCode?: string, page?: number, pageSize?: number, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupList(name, userGroup, actionGroupInputCode, page, pageSize, options)(fetch, basePath);
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
    workflowActionGroupRemoveAction(code: string, id: string, model: WorkflowActionGroupRemoveActionWebRequestModel, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupRemoveAction(code, id, model, options)(fetch, basePath);
    },
    /**
     * Fetches a list of workflowActionGroups with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists user workflowActionGroups with their winning permission
     * @param {string} username The name of the user to get workflowActionGroup access advisor for
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowActionGroupWorkflowActionGroupAccessAdvisor(username: string, page?: number, pageSize?: number, options?: any) {
      return WorkflowActionGroupApiFp(configuration).workflowActionGroupWorkflowActionGroupAccessAdvisor(username, page, pageSize, options)(fetch, basePath);
    },
  };
};
