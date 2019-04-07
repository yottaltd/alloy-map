// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { TeamApiFp } from './TeamApiFp';
import { TeamApi } from './TeamApi';
/**
 * TeamApi - factory interface
 * @export
 */
export const TeamApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Creates a team item based on the information sent in the model
     * @summary Create a team
     * @param {ItemCreateWebRequestModel} model Model containing the team details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    teamCreate(model: ItemCreateWebRequestModel, options?: any) {
      return TeamApiFp(configuration).teamCreate(model, options)(fetch, basePath);
    },
    /**
     * Delete the team item and recalculate costs of all job work items on jobs that were assigned to this team
     * @summary Deletes a team by id and updates job costs
     * @param {string} id The AId of the team to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    teamDelete(id: string, options?: any) {
      return TeamApiFp(configuration).teamDelete(id, options)(fetch, basePath);
    },
    /**
     * Edits a team item based on the information sent in the model
     * @summary Edits the team item by id
     * @param {string} id The AId of the team item to edit
     * @param {ItemEditWebRequestModel} model The model containing the info to edit the team item
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    teamEdit(id: string, model: ItemEditWebRequestModel, options?: any) {
      return TeamApiFp(configuration).teamEdit(id, model, options)(fetch, basePath);
    },
  };
};
