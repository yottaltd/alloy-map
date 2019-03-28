// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { MeshEditWebRequestModel } from './MeshEditWebRequestModel';
import { MeshPermissionsEditWebRequestModel } from './MeshPermissionsEditWebRequestModel';
import { MeshApiFp } from './MeshApiFp';
import { MeshApi } from './MeshApi';
/**
 * MeshApi - factory interface
 * @export
 */
export const MeshApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Edits a mesh based on the information sent in the model
     * @summary Edit a mesh
     * @param {string} code The Guc of the mesh to edit
     * @param {MeshEditWebRequestModel} model Model containing the new mesh details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshEdit(code: string, model: MeshEditWebRequestModel, options?: any) {
      return MeshApiFp(configuration).meshEdit(code, model, options)(fetch, basePath);
    },
    /**
     * Edit the permissions on the mesh with the specified code
     * @summary Edit permissions for a mesh
     * @param {string} code The Guc of the mesh to edit the permissions of
     * @param {MeshPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshEditPermissions(code: string, model: MeshPermissionsEditWebRequestModel, options?: any) {
      return MeshApiFp(configuration).meshEditPermissions(code, model, options)(fetch, basePath);
    },
    /**
     * Fetches a mesh by its globally unique code (Guc).
     * @summary Get a mesh by its code
     * @param {string} code The Guc for the mesh being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshGet(code: string, options?: any) {
      return MeshApiFp(configuration).meshGet(code, options)(fetch, basePath);
    },
    /**
     * Fetches the permissions of a mesh by its Guc
     * @summary Get a mesh permissions by its code
     * @param {string} code The Guc for the mesh whose permissions are being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshGetPermissions(code: string, options?: any) {
      return MeshApiFp(configuration).meshGetPermissions(code, options)(fetch, basePath);
    },
    /**
     * Fetches a list of meshes optionally specifying page and the number of results to return per page.
     * @summary Get a list of meshes
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshList(page?: number, pageSize?: number, options?: any) {
      return MeshApiFp(configuration).meshList(page, pageSize, options)(fetch, basePath);
    },
  };
};
