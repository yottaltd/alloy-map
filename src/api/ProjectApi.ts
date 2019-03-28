// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { ProjectCloseWebRequestModel } from './ProjectCloseWebRequestModel';
import { ProjectApiFp } from './ProjectApiFp';
/**
 * ProjectApi - object-oriented interface
 * @export
 * @class ProjectApi
 * @extends {BaseAPI}
 */
export class ProjectApi extends BaseAPI {
  /**
   * Closes a project item based on the information sent in the model
   * @summary Closes a project
   * @param {string} id The AId of the project to close
   * @param {ProjectCloseWebRequestModel} model Model containing the info for the project close operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProjectApi
   */
  public projectCloseProject(id: string, model: ProjectCloseWebRequestModel, options?: any) {
    return ProjectApiFp(this.configuration).projectCloseProject(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Creates a project item based on the information sent in the model
   * @summary Create a project
   * @param {ItemCreateWebRequestModel} model Model containing the project details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProjectApi
   */
  public projectCreate(model: ItemCreateWebRequestModel, options?: any) {
    return ProjectApiFp(this.configuration).projectCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Delete the project item
   * @summary Deletes a project by id
   * @param {string} id The AId of the project to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProjectApi
   */
  public projectDelete(id: string, options?: any) {
    return ProjectApiFp(this.configuration).projectDelete(id, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a project item based on the information sent in the model
   * @summary Edits the project item by id
   * @param {string} id The AId of the project item to edit
   * @param {ItemEditWebRequestModel} model The model containing the info to edit the project item
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ProjectApi
   */
  public projectEdit(id: string, model: ItemEditWebRequestModel, options?: any) {
    return ProjectApiFp(this.configuration).projectEdit(id, model, options)(this.fetch, this.basePath);
  }

}
