import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { AccessPolicyCreateWebRequestModel } from './AccessPolicyCreateWebRequestModel';
import { AccessPolicyEditWebRequestModel } from './AccessPolicyEditWebRequestModel';
import { AccessPolicyRuleCreateWebRequestModel } from './AccessPolicyRuleCreateWebRequestModel';
import { AccessPolicyRuleDeleteWebRequestModel } from './AccessPolicyRuleDeleteWebRequestModel';
import { AccessPolicyRuleEditWebRequestModel } from './AccessPolicyRuleEditWebRequestModel';
import { AccessPolicyApiFp } from './AccessPolicyApiFp';
import { AccessPolicyApi } from './AccessPolicyApi';
/**
 * AccessPolicyApi - factory interface
 * @export
 */
export const AccessPolicyApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Creates an Access Policy based on the information sent in the model
     * @summary Create an Access Policy
     * @param {AccessPolicyCreateWebRequestModel} model Model containing the new Access Policy details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyCreate(model: AccessPolicyCreateWebRequestModel, options?: any) {
      return AccessPolicyApiFp(configuration).accessPolicyCreate(model, options)(fetch, basePath);
    },
    /**
     * Adds a rule to the specified Access Policy
     * @summary Add a rule to an Access Policy
     * @param {string} code The Guc of the Access Policy to add a rule to
     * @param {AccessPolicyRuleCreateWebRequestModel} model Model containing the information of the rule to be added
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyCreateRule(code: string, model: AccessPolicyRuleCreateWebRequestModel, options?: any) {
      return AccessPolicyApiFp(configuration).accessPolicyCreateRule(code, model, options)(fetch, basePath);
    },
    /**
     * Deletes a Access Policy based on the information sent in the model
     * @summary Delete an Access Policy
     * @param {string} code The Guc of the Access Policy to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyDelete(code: string, options?: any) {
      return AccessPolicyApiFp(configuration).accessPolicyDelete(code, options)(fetch, basePath);
    },
    /**
     * Removes a rule to the specified Access Policy
     * @summary Remove a rule from an Access Policy
     * @param {string} code The Guc of the Access Policy to remove a rule from
     * @param {string} id The AId of the rule to remove
     * @param {AccessPolicyRuleDeleteWebRequestModel} model The model containing the signature necessary to delete a rule from the Access Policy
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyDeleteRule(code: string, id: string, model: AccessPolicyRuleDeleteWebRequestModel, options?: any) {
      return AccessPolicyApiFp(configuration).accessPolicyDeleteRule(code, id, model, options)(fetch, basePath);
    },
    /**
     * Edits an Access Policy based on the information sent in the model
     * @summary Edit an Access Policy
     * @param {string} code The Guc of the Access Policy to edit
     * @param {AccessPolicyEditWebRequestModel} model Model containing the new Access Policy details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyEdit(code: string, model: AccessPolicyEditWebRequestModel, options?: any) {
      return AccessPolicyApiFp(configuration).accessPolicyEdit(code, model, options)(fetch, basePath);
    },
    /**
     * Edit a rule on the specified Access Policy
     * @summary Edit a rule in an Access Policy
     * @param {string} code The Guc of the Access Policy to edit a rule on
     * @param {string} id The AId of the rule to edit
     * @param {AccessPolicyRuleEditWebRequestModel} model The model containing the info necessary to edit a rule on the Access Policy
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyEditRule(code: string, id: string, model: AccessPolicyRuleEditWebRequestModel, options?: any) {
      return AccessPolicyApiFp(configuration).accessPolicyEditRule(code, id, model, options)(fetch, basePath);
    },
    /**
     * Fetches an Access Policy by its globally unique code (Guc).
     * @summary Get an Access Policy by its code
     * @param {string} code The Guc for the Access Policy being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyGet(code: string, options?: any) {
      return AccessPolicyApiFp(configuration).accessPolicyGet(code, options)(fetch, basePath);
    },
    /**
     * Fetches a list of Access Policies filtered by the provided parameters
     * @summary Get a list of Access Policies
     * @param {string} [query] Optional query to filter the access policies by
     * @param {Array<string>} [appliesTo] The optional dodi code Guc, if specified, only the designs implementing that interface will be returned
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accessPolicyList(query?: string, appliesTo?: Array<string>, page?: number, pageSize?: number, options?: any) {
      return AccessPolicyApiFp(configuration).accessPolicyList(query, appliesTo, page, pageSize, options)(fetch, basePath);
    },
  };
};
