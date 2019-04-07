// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { TeamApiFp } from './TeamApiFp';
/**
 * TeamApi - object-oriented interface
 * @export
 * @class TeamApi
 * @extends {BaseAPI}
 */
export class TeamApi extends BaseAPI {
  /**
   * Creates a team item based on the information sent in the model
   * @summary Create a team
   * @param {ItemCreateWebRequestModel} model Model containing the team details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TeamApi
   */
  public teamCreate(model: ItemCreateWebRequestModel, options?: any) {
    return TeamApiFp(this.configuration).teamCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Delete the team item and recalculate costs of all job work items on jobs that were assigned to this team
   * @summary Deletes a team by id and updates job costs
   * @param {string} id The AId of the team to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TeamApi
   */
  public teamDelete(id: string, options?: any) {
    return TeamApiFp(this.configuration).teamDelete(id, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a team item based on the information sent in the model
   * @summary Edits the team item by id
   * @param {string} id The AId of the team item to edit
   * @param {ItemEditWebRequestModel} model The model containing the info to edit the team item
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TeamApi
   */
  public teamEdit(id: string, model: ItemEditWebRequestModel, options?: any) {
    return TeamApiFp(this.configuration).teamEdit(id, model, options)(this.fetch, this.basePath);
  }

}
