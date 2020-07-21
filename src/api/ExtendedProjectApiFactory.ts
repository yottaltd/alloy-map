import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ExtendedCloneWebRequestModel } from './ExtendedCloneWebRequestModel';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { ProjectCloseWebRequestModel } from './ProjectCloseWebRequestModel';
import { ExtendedProjectApiFp } from './ExtendedProjectApiFp';
import { ExtendedProjectApi } from './ExtendedProjectApi';
/**
 * ExtendedProjectApi - factory interface
 * @export
 */
export const ExtendedProjectApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Clones a project based on the information sent in the model
     * @summary Clone a project
     * @param {string} id The AId of the project item to clone
     * @param {ExtendedCloneWebRequestModel} model Model containing the new project item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectClone(id: string, model: ExtendedCloneWebRequestModel, options?: any) {
      return ExtendedProjectApiFp(configuration).projectClone(id, model, options)(fetch, basePath);
    },
    /**
     * Closes a project item based on the information sent in the model
     * @summary Closes a project
     * @param {string} id The AId of the project to close
     * @param {ProjectCloseWebRequestModel} model Model containing the info for the project close operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectCloseProject(id: string, model: ProjectCloseWebRequestModel, options?: any) {
      return ExtendedProjectApiFp(configuration).projectCloseProject(id, model, options)(fetch, basePath);
    },
    /**
     * Creates a project item based on the information sent in the model
     * @summary Create a project
     * @param {ItemCreateWebRequestModel} model Model containing the project details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectCreate(model: ItemCreateWebRequestModel, options?: any) {
      return ExtendedProjectApiFp(configuration).projectCreate(model, options)(fetch, basePath);
    },
    /**
     * Delete the project item
     * @summary Deletes a project by id
     * @param {string} id The AId of the project to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectDelete(id: string, options?: any) {
      return ExtendedProjectApiFp(configuration).projectDelete(id, options)(fetch, basePath);
    },
    /**
     * Edits a project item based on the information sent in the model
     * @summary Edits the project item by id
     * @param {string} id The AId of the project item to edit
     * @param {ItemEditWebRequestModel} model The model containing the info to edit the project item
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    projectEdit(id: string, model: ItemEditWebRequestModel, options?: any) {
      return ExtendedProjectApiFp(configuration).projectEdit(id, model, options)(fetch, basePath);
    },
  };
};
