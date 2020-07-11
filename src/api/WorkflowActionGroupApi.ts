import { BaseAPI } from './BaseAPI';
import { WorkflowActionGroupAddActionWebRequestModel } from './WorkflowActionGroupAddActionWebRequestModel';
import { WorkflowActionGroupCreateWebRequestModel } from './WorkflowActionGroupCreateWebRequestModel';
import { WorkflowActionGroupEditActionWebRequestModel } from './WorkflowActionGroupEditActionWebRequestModel';
import { WorkflowActionGroupEditWebRequestModel } from './WorkflowActionGroupEditWebRequestModel';
import { WorkflowActionGroupGetActionParametersWebRequestModel } from './WorkflowActionGroupGetActionParametersWebRequestModel';
import { WorkflowActionGroupGetAllowedActionsWebRequestModel } from './WorkflowActionGroupGetAllowedActionsWebRequestModel';
import { WorkflowActionGroupPermissionsEditWebRequestModel } from './WorkflowActionGroupPermissionsEditWebRequestModel';
import { WorkflowActionGroupRemoveActionWebRequestModel } from './WorkflowActionGroupRemoveActionWebRequestModel';
import { WorkflowActionGroupApiFp } from './WorkflowActionGroupApiFp';
/**
 * WorkflowActionGroupApi - object-oriented interface
 * @export
 * @class WorkflowActionGroupApi
 * @extends {BaseAPI}
 */
export class WorkflowActionGroupApi extends BaseAPI {
  /**
   * 
   * @summary Add an action to a workflowActionGroup
   * @param {string} code The code of the workflowActionGroup to add the action to
   * @param {WorkflowActionGroupAddActionWebRequestModel} model The model containing all the add action operation details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupAddAction(code: string, model: WorkflowActionGroupAddActionWebRequestModel, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupAddAction(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Create a workflowActionGroup
   * @param {WorkflowActionGroupCreateWebRequestModel} model The model containing all the create operation details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupCreate(model: WorkflowActionGroupCreateWebRequestModel, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Delete a workflowActionGroup
   * @param {string} code The code of the workflowActionGroup to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupDelete(code: string, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupDelete(code, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Edit a workflowActionGroup
   * @param {string} code The code of the workflowActionGroup to edit
   * @param {WorkflowActionGroupEditWebRequestModel} model The model containing all the edit operation details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupEdit(code: string, model: WorkflowActionGroupEditWebRequestModel, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupEdit(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Edit an action on a workflowActionGroup
   * @param {string} code The code of the workflowActionGroup to edit the action on
   * @param {string} id The id of the action to edit
   * @param {WorkflowActionGroupEditActionWebRequestModel} model The model containing all the edit action operation details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupEditAction(code: string, id: string, model: WorkflowActionGroupEditActionWebRequestModel, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupEditAction(code, id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edit the permissions on the workflowActionGroup with the specified code
   * @summary Edit permissions for a workflowActionGroup
   * @param {string} code The Guc of the workflowActionGroup to edit the permissions of
   * @param {WorkflowActionGroupPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupEditPermissions(code: string, model: WorkflowActionGroupPermissionsEditWebRequestModel, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupEditPermissions(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get a workflowActionGroup
   * @param {string} code The Guc of the workflowActionGroup to retrieve
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupGet(code: string, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * Given an action type, position in workflow action group, and values, get information about extra parameters that need to be supplied (and if any are optional since they can be inferred by the system) in this case.
   * @summary List the parameters for the specified action.
   * @param {string} code The code of the workflowActionGroup being queried
   * @param {WorkflowActionGroupGetActionParametersWebRequestModel} model Model containing the details of the get parameters request
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupGetActionParameters(code: string, model: WorkflowActionGroupGetActionParametersWebRequestModel, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupGetActionParameters(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List the actions that are valid to be added to this location in a workflow action group.
   * @param {string} code The code of the workflowActionGroup being queried
   * @param {WorkflowActionGroupGetAllowedActionsWebRequestModel} model Model containing the details of the get allowed actions request
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupGetAllowedActions(code: string, model: WorkflowActionGroupGetAllowedActionsWebRequestModel, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupGetAllowedActions(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches the permissions of a workflowActionGroup by its Guc
   * @summary Get a workflowActionGroup permissions by its code
   * @param {string} code The Guc for the workflowActionGroup whose permissions are being requested
   * @param {string} [username] Optional username to get permissions for the specific user. This value is mutually exclusive with Role.
   * @param {string} [role] Optional role to get permissions for the specific role. This value is mutually exclusive with Username.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupGetPermissions(code: string, username?: string, role?: string, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupGetPermissions(code, username, role, options)(this.fetch, this.basePath);
  }

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
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupList(name?: string, context?: 'Core' | 'Module' | 'Customer', userGroup?: string, actionGroupInputCode?: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupList(name, context, userGroup, actionGroupInputCode, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Remove an action on a workflowActionGroup
   * @param {string} code The code of the workflowActionGroup to remove the action from
   * @param {string} id The id of the action to remove
   * @param {WorkflowActionGroupRemoveActionWebRequestModel} model The model containing all the remove action operation details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupRemoveAction(code: string, id: string, model: WorkflowActionGroupRemoveActionWebRequestModel, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupRemoveAction(code, id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of workflowActionGroups with winning permission optionally specifying page and the number of results to return per page.
   * @summary Use api/workflow-action-group/access-advisor/user/{username} instead
   * @param {string} username The name of the user to get workflowActionGroup access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupWorkflowActionGroupAccessAdvisor(username: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupWorkflowActionGroupAccessAdvisor(username, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of workflowActionGroups with winning permission optionally specifying page and the number of results to return per page.
   * @summary Lists role workflowActionGroups with their winning permission
   * @param {string} code The code of the role to get workflowActionGroup access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupWorkflowActionGroupAccessAdvisorByRole(code: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupWorkflowActionGroupAccessAdvisorByRole(code, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of workflowActionGroups with winning permission optionally specifying page and the number of results to return per page.
   * @summary Lists user workflowActionGroups with their winning permission
   * @param {string} username The name of the user to get workflowActionGroup access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowActionGroupApi
   */
  public workflowActionGroupWorkflowActionGroupAccessAdvisorByUser(username: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowActionGroupApiFp(this.configuration).workflowActionGroupWorkflowActionGroupAccessAdvisorByUser(username, query, page, pageSize, options)(this.fetch, this.basePath);
  }

}
