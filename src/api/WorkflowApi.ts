import { BaseAPI } from './BaseAPI';
import { CreateManualWorkflowRunWebRequestModel } from './CreateManualWorkflowRunWebRequestModel';
import { WorkflowAddActionWebRequestModel } from './WorkflowAddActionWebRequestModel';
import { WorkflowCloneWebRequestModel } from './WorkflowCloneWebRequestModel';
import { WorkflowCreateWebRequestModel } from './WorkflowCreateWebRequestModel';
import { WorkflowEditActionWebRequestModel } from './WorkflowEditActionWebRequestModel';
import { WorkflowEditWebRequestModel } from './WorkflowEditWebRequestModel';
import { WorkflowGetActionParametersWebRequestModel } from './WorkflowGetActionParametersWebRequestModel';
import { WorkflowGetAllowedActionsWebRequestModel } from './WorkflowGetAllowedActionsWebRequestModel';
import { WorkflowListNextDateTimesWebRequestModel } from './WorkflowListNextDateTimesWebRequestModel';
import { WorkflowPermissionsEditWebRequestModel } from './WorkflowPermissionsEditWebRequestModel';
import { WorkflowRemoveActionWebRequestModel } from './WorkflowRemoveActionWebRequestModel';
import { WorkflowApiFp } from './WorkflowApiFp';
/**
 * WorkflowApi - object-oriented interface
 * @export
 * @class WorkflowApi
 * @extends {BaseAPI}
 */
export class WorkflowApi extends BaseAPI {
  /**
   * 
   * @summary Add an action to a workflow
   * @param {string} code The code of the workflow to add the action to
   * @param {WorkflowAddActionWebRequestModel} model The model containing all the add action operation details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowAddAction(code: string, model: WorkflowAddActionWebRequestModel, options?: any) {
    return WorkflowApiFp(this.configuration).workflowAddAction(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Clone a workflow
   * @param {string} code The code of the workflow to clone
   * @param {WorkflowCloneWebRequestModel} model The model containing all the clone operation details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowClone(code: string, model: WorkflowCloneWebRequestModel, options?: any) {
    return WorkflowApiFp(this.configuration).workflowClone(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Create a workflow
   * @param {WorkflowCreateWebRequestModel} model The model containing all the create operation details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowCreate(model: WorkflowCreateWebRequestModel, options?: any) {
    return WorkflowApiFp(this.configuration).workflowCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Delete a workflow
   * @param {string} code The code of the workflow to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowDelete(code: string, options?: any) {
    return WorkflowApiFp(this.configuration).workflowDelete(code, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Edit a workflow
   * @param {string} code The code of the workflow to edit
   * @param {WorkflowEditWebRequestModel} model The model containing all the edit operation details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowEdit(code: string, model: WorkflowEditWebRequestModel, options?: any) {
    return WorkflowApiFp(this.configuration).workflowEdit(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Edit an action on a workflow
   * @param {string} code The code of the workflow to edit the action on
   * @param {string} id The id of the action to edit
   * @param {WorkflowEditActionWebRequestModel} model The model containing all the edit action operation details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowEditAction(code: string, id: string, model: WorkflowEditActionWebRequestModel, options?: any) {
    return WorkflowApiFp(this.configuration).workflowEditAction(code, id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edit the permissions on the workflow with the specified code
   * @summary Edit permissions for a workflow
   * @param {string} code The Guc of the workflow to edit the permissions of
   * @param {WorkflowPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowEditPermissions(code: string, model: WorkflowPermissionsEditWebRequestModel, options?: any) {
    return WorkflowApiFp(this.configuration).workflowEditPermissions(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get a workflow
   * @param {string} code The Guc of the workflow to retrieve
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowGet(code: string, options?: any) {
    return WorkflowApiFp(this.configuration).workflowGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * Given an action type, position in workflow action group, and values, get information about extra parameters that need to be supplied (and if any are optional since they can be inferred by the system) in this case.
   * @summary List the parameters for the specified action.
   * @param {string} code The code of the workflow being queried
   * @param {WorkflowGetActionParametersWebRequestModel} model Model containing the details of the get parameters request
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowGetActionParameters(code: string, model: WorkflowGetActionParametersWebRequestModel, options?: any) {
    return WorkflowApiFp(this.configuration).workflowGetActionParameters(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List the actions that are valid to be added to this location in a workflow action group.
   * @param {string} code The code of the workflow being queried
   * @param {WorkflowGetAllowedActionsWebRequestModel} model Model containing the details of the get allowed actions request
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowGetAllowedActions(code: string, model: WorkflowGetAllowedActionsWebRequestModel, options?: any) {
    return WorkflowApiFp(this.configuration).workflowGetAllowedActions(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get the logs associated with a workflow run
   * @param {string} [runId] The id of the workflow run to retrieve logs for
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowGetLogs(runId?: string, options?: any) {
    return WorkflowApiFp(this.configuration).workflowGetLogs(runId, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches the permissions of a workflow by its Guc
   * @summary Get a workflow permissions by its code
   * @param {string} code The Guc for the workflow whose permissions are being requested
   * @param {string} [username] Optional username to get permissions for the specific user. This value is mutually exclusive with Role.
   * @param {string} [role] Optional role to get permissions for the specific role. This value is mutually exclusive with Username.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowGetPermissions(code: string, username?: string, role?: string, options?: any) {
    return WorkflowApiFp(this.configuration).workflowGetPermissions(code, username, role, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List workflows
   * @param {string} [name] The optional workflow name (full or partial) to filter on
   * @param {'Core' | 'Module' | 'Customer'} [context] The optional workflow context to filter on
   * @param {string} [userGroup] Optional Guc to filter workflows by. If specified, only the workflows that have this user group code within their permissions are returned
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowList(name?: string, context?: 'Core' | 'Module' | 'Customer', userGroup?: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowApiFp(this.configuration).workflowList(name, context, userGroup, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List the workflows that are applicable to a dodi
   * @param {string} code The dodi code to find workflows applicable to
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowListApplicableWorkflows(code: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowApiFp(this.configuration).workflowListApplicableWorkflows(code, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List the workflows that will clone a specific item
   * @param {string} itemId The id of the item that will be cloned
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowListCloningItemWorkflows(itemId: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowApiFp(this.configuration).workflowListCloningItemWorkflows(itemId, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List the triggered runs for a workflow
   * @param {string} code 
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowListTriggerLogs(code: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowApiFp(this.configuration).workflowListTriggerLogs(code, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Remove an action on a workflow
   * @param {string} code The code of the workflow to remove the action from
   * @param {string} id The id of the action to remove
   * @param {WorkflowRemoveActionWebRequestModel} model The model containing all the remove action operation details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowRemoveAction(code: string, id: string, model: WorkflowRemoveActionWebRequestModel, options?: any) {
    return WorkflowApiFp(this.configuration).workflowRemoveAction(code, id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of workflows with winning permission optionally specifying page and the number of results to return per page.
   * @summary Use api/workflow/access-advisor/user/{username} instead
   * @param {string} username The name of the user to get workflow access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowWorkflowAccessAdvisor(username: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowApiFp(this.configuration).workflowWorkflowAccessAdvisor(username, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of workflows with winning permission optionally specifying page and the number of results to return per page.
   * @summary Lists role workflows with their winning permission
   * @param {string} code The code of the role to get workflow access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowWorkflowAccessAdvisorByRole(code: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowApiFp(this.configuration).workflowWorkflowAccessAdvisorByRole(code, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of workflows with winning permission optionally specifying page and the number of results to return per page.
   * @summary Lists user workflows with their winning permission
   * @param {string} username The name of the user to get workflow access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowWorkflowAccessAdvisorByUser(username: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowApiFp(this.configuration).workflowWorkflowAccessAdvisorByUser(username, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Returns the next n dates, where n is the number specified in the model,       at which the stated workflows will trigger. If more than the specified dates are available, only the n       closest to the current date will be returned.       NOTE: Currently only Calendar triggers are supported
   * @summary Get next trigger dates
   * @param {WorkflowListNextDateTimesWebRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowWorkflowListNextDates(model: WorkflowListNextDateTimesWebRequestModel, options?: any) {
    return WorkflowApiFp(this.configuration).workflowWorkflowListNextDates(model, options)(this.fetch, this.basePath);
  }

  /**
   * Queues a workflow run for a workflow that has a time or manual trigger, event triggered workflows are not supported.       Manual trigger workflows are using the supplied AQS query to specify the output items of the manual trigger.       Time based workflows do not support the query parameter for the manual runs.
   * @summary Start a manually triggered workflow run
   * @param {string} code The code of the workflow to run, which must have a time or manual trigger
   * @param {CreateManualWorkflowRunWebRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowWorkflowManualRun(code: string, model: CreateManualWorkflowRunWebRequestModel, options?: any) {
    return WorkflowApiFp(this.configuration).workflowWorkflowManualRun(code, model, options)(this.fetch, this.basePath);
  }

}
