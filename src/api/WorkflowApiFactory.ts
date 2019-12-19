// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { CreateManualWorkflowRunWebRequestModel } from './CreateManualWorkflowRunWebRequestModel';
import { WorkflowAddActionWebRequestModel } from './WorkflowAddActionWebRequestModel';
import { WorkflowCreateWebRequestModel } from './WorkflowCreateWebRequestModel';
import { WorkflowEditActionWebRequestModel } from './WorkflowEditActionWebRequestModel';
import { WorkflowEditWebRequestModel } from './WorkflowEditWebRequestModel';
import { WorkflowGetActionParametersWebRequestModel } from './WorkflowGetActionParametersWebRequestModel';
import { WorkflowGetAllowedActionsWebRequestModel } from './WorkflowGetAllowedActionsWebRequestModel';
import { WorkflowListNextDateTimesWebRequestModel } from './WorkflowListNextDateTimesWebRequestModel';
import { WorkflowPermissionsEditWebRequestModel } from './WorkflowPermissionsEditWebRequestModel';
import { WorkflowRemoveActionWebRequestModel } from './WorkflowRemoveActionWebRequestModel';
import { WorkflowApiFp } from './WorkflowApiFp';
import { WorkflowApi } from './WorkflowApi';
/**
 * WorkflowApi - factory interface
 * @export
 */
export const WorkflowApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary Add an action to a workflow
     * @param {string} code The code of the workflow to add the action to
     * @param {WorkflowAddActionWebRequestModel} model The model containing all the add action operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowAddAction(code: string, model: WorkflowAddActionWebRequestModel, options?: any) {
      return WorkflowApiFp(configuration).workflowAddAction(code, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Create a workflow
     * @param {WorkflowCreateWebRequestModel} model The model containing all the create operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowCreate(model: WorkflowCreateWebRequestModel, options?: any) {
      return WorkflowApiFp(configuration).workflowCreate(model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Delete a workflow
     * @param {string} code The code of the workflow to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowDelete(code: string, options?: any) {
      return WorkflowApiFp(configuration).workflowDelete(code, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Edit a workflow
     * @param {string} code The code of the workflow to edit
     * @param {WorkflowEditWebRequestModel} model The model containing all the edit operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowEdit(code: string, model: WorkflowEditWebRequestModel, options?: any) {
      return WorkflowApiFp(configuration).workflowEdit(code, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Edit an action on a workflow
     * @param {string} code The code of the workflow to edit the action on
     * @param {string} id The id of the action to remove
     * @param {WorkflowEditActionWebRequestModel} model The model containing all the edit action operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowEditAction(code: string, id: string, model: WorkflowEditActionWebRequestModel, options?: any) {
      return WorkflowApiFp(configuration).workflowEditAction(code, id, model, options)(fetch, basePath);
    },
    /**
     * Edit the permissions on the workflow with the specified code
     * @summary Edit permissions for a workflow
     * @param {string} code The Guc of the workflow to edit the permissions of
     * @param {WorkflowPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowEditPermissions(code: string, model: WorkflowPermissionsEditWebRequestModel, options?: any) {
      return WorkflowApiFp(configuration).workflowEditPermissions(code, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get a workflow
     * @param {string} code The Guc of the workflow to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowGet(code: string, options?: any) {
      return WorkflowApiFp(configuration).workflowGet(code, options)(fetch, basePath);
    },
    /**
     * Given an action type, position in workflow action group, and values, get information about extra parameters that need to be supplied (and if any are optional since they can be inferred by the system) in this case.
     * @summary List the parameters for the specified action.
     * @param {string} code The code of the workflow being queried
     * @param {WorkflowGetActionParametersWebRequestModel} model Model containing the details of the get parameters request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowGetActionParameters(code: string, model: WorkflowGetActionParametersWebRequestModel, options?: any) {
      return WorkflowApiFp(configuration).workflowGetActionParameters(code, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List the actions that are valid to be added to this location in a workflow action group.
     * @param {string} code The code of the workflow being queried
     * @param {WorkflowGetAllowedActionsWebRequestModel} model Model containing the details of the get allowed actions request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowGetAllowedActions(code: string, model: WorkflowGetAllowedActionsWebRequestModel, options?: any) {
      return WorkflowApiFp(configuration).workflowGetAllowedActions(code, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get the logs associated with a workflow run
     * @param {string} runId The id of the workflow run to retrieve logs for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowGetLogs(runId: string, options?: any) {
      return WorkflowApiFp(configuration).workflowGetLogs(runId, options)(fetch, basePath);
    },
    /**
     * Fetches the permissions of a workflow by its Guc
     * @summary Get a workflow permissions by its code
     * @param {string} code The Guc for the workflow whose permissions are being requested
     * @param {string} [username] Optional username to get permissions for the specific user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowGetPermissions(code: string, username?: string, options?: any) {
      return WorkflowApiFp(configuration).workflowGetPermissions(code, username, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List workflows
     * @param {string} [name] The optional workflow name (full or partial) to filter on
     * @param {string} [userGroup] Optional Guc to filter workflows by. If specified, only the workflows that have this user group code within their permissions are returned
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowList(name?: string, userGroup?: string, page?: number, pageSize?: number, options?: any) {
      return WorkflowApiFp(configuration).workflowList(name, userGroup, page, pageSize, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List the workflows that are applicable to a dodi
     * @param {string} code The dodi code to find workflows applicable to
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowListApplicableWorkflows(code: string, page?: number, pageSize?: number, options?: any) {
      return WorkflowApiFp(configuration).workflowListApplicableWorkflows(code, page, pageSize, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List the workflows that will clone a specific item
     * @param {string} itemId The id of the item that will be cloned
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowListCloningItemWorkflows(itemId: string, page?: number, pageSize?: number, options?: any) {
      return WorkflowApiFp(configuration).workflowListCloningItemWorkflows(itemId, page, pageSize, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List the triggered runs for a workflow
     * @param {string} code 
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowListTriggerLogs(code: string, page?: number, pageSize?: number, options?: any) {
      return WorkflowApiFp(configuration).workflowListTriggerLogs(code, page, pageSize, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Remove an action on a workflow
     * @param {string} code The code of the workflow to remove the action from
     * @param {string} id The id of the action to remove
     * @param {WorkflowRemoveActionWebRequestModel} model The model containing all the remove action operation details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowRemoveAction(code: string, id: string, model: WorkflowRemoveActionWebRequestModel, options?: any) {
      return WorkflowApiFp(configuration).workflowRemoveAction(code, id, model, options)(fetch, basePath);
    },
    /**
     * Fetches a list of workflows with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists user workflows with their winning permission
     * @param {string} username The name of the user to get workflow access advisor for
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowWorkflowAccessAdvisor(username: string, page?: number, pageSize?: number, options?: any) {
      return WorkflowApiFp(configuration).workflowWorkflowAccessAdvisor(username, page, pageSize, options)(fetch, basePath);
    },
    /**
     * Returns the next n dates, where n is the number specified in the model,       at which the stated workflows will trigger. If more than the specified dates are available, only the n       closest to the current date will be returned.       NOTE: Currently only Calendar triggers are supported
     * @summary Get next trigger dates
     * @param {WorkflowListNextDateTimesWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowWorkflowListNextDates(model: WorkflowListNextDateTimesWebRequestModel, options?: any) {
      return WorkflowApiFp(configuration).workflowWorkflowListNextDates(model, options)(fetch, basePath);
    },
    /**
     * Queues a workflow run for a workflow that has a manual trigger,       using the supplied AQS query to specify the output items of the manual trigger.
     * @summary Start a manually triggered workflow run
     * @param {string} code The code of the workflow to run, which must have a manual trigger
     * @param {CreateManualWorkflowRunWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workflowWorkflowManualRun(code: string, model: CreateManualWorkflowRunWebRequestModel, options?: any) {
      return WorkflowApiFp(configuration).workflowWorkflowManualRun(code, model, options)(fetch, basePath);
    },
  };
};
