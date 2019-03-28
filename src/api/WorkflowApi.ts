// tslint:disable
import { BaseAPI } from './BaseAPI';
import { WorkflowAddActionWebRequestModel } from './WorkflowAddActionWebRequestModel';
import { WorkflowCreateWebRequestModel } from './WorkflowCreateWebRequestModel';
import { WorkflowEditActionWebRequestModel } from './WorkflowEditActionWebRequestModel';
import { WorkflowEditWebRequestModel } from './WorkflowEditWebRequestModel';
import { WorkflowGetActionParametersWebRequestModel } from './WorkflowGetActionParametersWebRequestModel';
import { WorkflowGetAllowedActionsWebRequestModel } from './WorkflowGetAllowedActionsWebRequestModel';
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
   * @param {string} id The id of the action to remove
   * @param {WorkflowEditActionWebRequestModel} model The model containing all the edit action operation details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowEditAction(code: string, id: string, model: WorkflowEditActionWebRequestModel, options?: any) {
    return WorkflowApiFp(this.configuration).workflowEditAction(code, id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edit the permissions on the layer with the specified code
   * @summary Edit permissions for a layer
   * @param {string} code The Guc of the layer to edit the permissions of
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
   * 
   * @summary Given an action type, position in workflow, and values, get information about extra parameters that need to be supplied (and if any are optional since they can be inferred by the system) in this case.
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
   * @summary Given a position in a workflow, list the actions that are potentially valid to be added to this location.
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
   * @param {string} runId The id of the workflow run to retrieve logs for
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowGetLogs(runId: string, options?: any) {
    return WorkflowApiFp(this.configuration).workflowGetLogs(runId, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches the permissions of a workflow by its Guc
   * @summary Get a workflow permissions by its code
   * @param {string} code The Guc for the workflow whose permissions are being requested
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowGetPermissions(code: string, options?: any) {
    return WorkflowApiFp(this.configuration).workflowGetPermissions(code, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List workflows
   * @param {string} [name] The optional workflow name (full or partial) to filter on
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowList(name?: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowApiFp(this.configuration).workflowList(name, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List the workflows that are applicable to a dodi
   * @param {string} code 
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkflowApi
   */
  public workflowListApplicableWorkflows(code: string, page?: number, pageSize?: number, options?: any) {
    return WorkflowApiFp(this.configuration).workflowListApplicableWorkflows(code, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List the triggered runs for a workflow
   * @param {string} code 
   * @param {number} [page] 
   * @param {number} [pageSize] 
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

}
