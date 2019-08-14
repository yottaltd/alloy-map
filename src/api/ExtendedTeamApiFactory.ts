// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ExtendedCloneWebRequestModel } from './ExtendedCloneWebRequestModel';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { ExtendedTeamApiFp } from './ExtendedTeamApiFp';
import { ExtendedTeamApi } from './ExtendedTeamApi';
/**
 * ExtendedTeamApi - factory interface
 * @export
 */
export const ExtendedTeamApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Clones a team based on the information sent in the model
     * @summary Clone a team
     * @param {string} id The AId of the team item to clone
     * @param {ExtendedCloneWebRequestModel} model Model containing the new team item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    teamClone(id: string, model: ExtendedCloneWebRequestModel, options?: any) {
      return ExtendedTeamApiFp(configuration).teamClone(id, model, options)(fetch, basePath);
    },
    /**
     * Creates a team item based on the information sent in the model
     * @summary Create a team
     * @param {ItemCreateWebRequestModel} model Model containing the team details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    teamCreate(model: ItemCreateWebRequestModel, options?: any) {
      return ExtendedTeamApiFp(configuration).teamCreate(model, options)(fetch, basePath);
    },
    /**
     * Delete the team item and recalculate costs of all job work items on jobs that were assigned to this team
     * @summary Deletes a team by id and updates job costs
     * @param {string} id The AId of the team to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    teamDelete(id: string, options?: any) {
      return ExtendedTeamApiFp(configuration).teamDelete(id, options)(fetch, basePath);
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
      return ExtendedTeamApiFp(configuration).teamEdit(id, model, options)(fetch, basePath);
    },
  };
};
