import { BaseAPI } from './BaseAPI';
import { ExtendedCloneWebRequestModel } from './ExtendedCloneWebRequestModel';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { ProjectCloseWebRequestModel } from './ProjectCloseWebRequestModel';
import { ExtendedProjectApiFp } from './ExtendedProjectApiFp';
/**
 * ExtendedProjectApi - object-oriented interface
 * @export
 * @class ExtendedProjectApi
 * @extends {BaseAPI}
 */
export class ExtendedProjectApi extends BaseAPI {
  /**
   * Clones a project based on the information sent in the model
   * @summary Clone a project
   * @param {string} id The AId of the project item to clone
   * @param {ExtendedCloneWebRequestModel} model Model containing the new project item details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedProjectApi
   */
  public projectClone(id: string, model: ExtendedCloneWebRequestModel, options?: any) {
    return ExtendedProjectApiFp(this.configuration).projectClone(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Closes a project item based on the information sent in the model
   * @summary Closes a project
   * @param {string} id The AId of the project to close
   * @param {ProjectCloseWebRequestModel} model Model containing the info for the project close operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedProjectApi
   */
  public projectCloseProject(id: string, model: ProjectCloseWebRequestModel, options?: any) {
    return ExtendedProjectApiFp(this.configuration).projectCloseProject(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Creates a project item based on the information sent in the model
   * @summary Create a project
   * @param {ItemCreateWebRequestModel} model Model containing the project details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedProjectApi
   */
  public projectCreate(model: ItemCreateWebRequestModel, options?: any) {
    return ExtendedProjectApiFp(this.configuration).projectCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Delete the project item
   * @summary Deletes a project by id
   * @param {string} id The AId of the project to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedProjectApi
   */
  public projectDelete(id: string, options?: any) {
    return ExtendedProjectApiFp(this.configuration).projectDelete(id, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a project item based on the information sent in the model
   * @summary Edits the project item by id
   * @param {string} id The AId of the project item to edit
   * @param {ItemEditWebRequestModel} model The model containing the info to edit the project item
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedProjectApi
   */
  public projectEdit(id: string, model: ItemEditWebRequestModel, options?: any) {
    return ExtendedProjectApiFp(this.configuration).projectEdit(id, model, options)(this.fetch, this.basePath);
  }

}
