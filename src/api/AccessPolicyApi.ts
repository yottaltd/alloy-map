import { BaseAPI } from './BaseAPI';
import { AccessPolicyCreateWebRequestModel } from './AccessPolicyCreateWebRequestModel';
import { AccessPolicyEditWebRequestModel } from './AccessPolicyEditWebRequestModel';
import { AccessPolicyRuleCreateWebRequestModel } from './AccessPolicyRuleCreateWebRequestModel';
import { AccessPolicyRuleDeleteWebRequestModel } from './AccessPolicyRuleDeleteWebRequestModel';
import { AccessPolicyRuleEditWebRequestModel } from './AccessPolicyRuleEditWebRequestModel';
import { AccessPolicyApiFp } from './AccessPolicyApiFp';
/**
 * AccessPolicyApi - object-oriented interface
 * @export
 * @class AccessPolicyApi
 * @extends {BaseAPI}
 */
export class AccessPolicyApi extends BaseAPI {
  /**
   * Creates an Access Policy based on the information sent in the model
   * @summary Create an Access Policy
   * @param {AccessPolicyCreateWebRequestModel} model Model containing the new Access Policy details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccessPolicyApi
   */
  public accessPolicyCreate(model: AccessPolicyCreateWebRequestModel, options?: any) {
    return AccessPolicyApiFp(this.configuration).accessPolicyCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Adds a rule to the specified Access Policy
   * @summary Add a rule to an Access Policy
   * @param {string} code The Guc of the Access Policy to add a rule to
   * @param {AccessPolicyRuleCreateWebRequestModel} model Model containing the information of the rule to be added
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccessPolicyApi
   */
  public accessPolicyCreateRule(code: string, model: AccessPolicyRuleCreateWebRequestModel, options?: any) {
    return AccessPolicyApiFp(this.configuration).accessPolicyCreateRule(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Deletes a Access Policy based on the information sent in the model
   * @summary Delete an Access Policy
   * @param {string} code The Guc of the Access Policy to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccessPolicyApi
   */
  public accessPolicyDelete(code: string, options?: any) {
    return AccessPolicyApiFp(this.configuration).accessPolicyDelete(code, options)(this.fetch, this.basePath);
  }

  /**
   * Removes a rule to the specified Access Policy
   * @summary Remove a rule from an Access Policy
   * @param {string} code The Guc of the Access Policy to remove a rule from
   * @param {string} id The AId of the rule to remove
   * @param {AccessPolicyRuleDeleteWebRequestModel} model The model containing the signature necessary to delete a rule from the Access Policy
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccessPolicyApi
   */
  public accessPolicyDeleteRule(code: string, id: string, model: AccessPolicyRuleDeleteWebRequestModel, options?: any) {
    return AccessPolicyApiFp(this.configuration).accessPolicyDeleteRule(code, id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edits an Access Policy based on the information sent in the model
   * @summary Edit an Access Policy
   * @param {string} code The Guc of the Access Policy to edit
   * @param {AccessPolicyEditWebRequestModel} model Model containing the new Access Policy details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccessPolicyApi
   */
  public accessPolicyEdit(code: string, model: AccessPolicyEditWebRequestModel, options?: any) {
    return AccessPolicyApiFp(this.configuration).accessPolicyEdit(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edit a rule on the specified Access Policy
   * @summary Edit a rule in an Access Policy
   * @param {string} code The Guc of the Access Policy to edit a rule on
   * @param {string} id The AId of the rule to edit
   * @param {AccessPolicyRuleEditWebRequestModel} model The model containing the info necessary to edit a rule on the Access Policy
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccessPolicyApi
   */
  public accessPolicyEditRule(code: string, id: string, model: AccessPolicyRuleEditWebRequestModel, options?: any) {
    return AccessPolicyApiFp(this.configuration).accessPolicyEditRule(code, id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches an Access Policy by its globally unique code (Guc).
   * @summary Get an Access Policy by its code
   * @param {string} code The Guc for the Access Policy being requested
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccessPolicyApi
   */
  public accessPolicyGet(code: string, options?: any) {
    return AccessPolicyApiFp(this.configuration).accessPolicyGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of Access Policies filtered by the provided parameters
   * @summary Get a list of Access Policies
   * @param {string} [query] Optional query to filter the access policies by
   * @param {Array<string>} [appliesTo] The optional dodi code Guc, if specified, only the designs implementing that interface will be returned
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccessPolicyApi
   */
  public accessPolicyList(query?: string, appliesTo?: Array<string>, page?: number, pageSize?: number, options?: any) {
    return AccessPolicyApiFp(this.configuration).accessPolicyList(query, appliesTo, page, pageSize, options)(this.fetch, this.basePath);
  }

}
