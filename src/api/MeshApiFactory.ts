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
     * @param {string} [username] Optional username to get permissions for the specific user. This value is mutually exclusive with Role.
     * @param {string} [role] Optional role to get permissions for the specific role. This value is mutually exclusive with Username.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshGetPermissions(code: string, username?: string, role?: string, options?: any) {
      return MeshApiFp(configuration).meshGetPermissions(code, username, role, options)(fetch, basePath);
    },
    /**
     * Fetches a list of meshes optionally specifying page and the number of results to return per page.
     * @summary Get a list of meshes
     * @param {string} [query] The optional mesh query string to filter on
     * @param {string} [userGroup] Optional Guc to filter meshes by. If specified, only the meshes that have this user group code within their permissions are returned
     * @param {'Core' | 'Module' | 'Customer'} [context] Optional mesh Context filter
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshList(query?: string, userGroup?: string, context?: 'Core' | 'Module' | 'Customer', page?: number, pageSize?: number, options?: any) {
      return MeshApiFp(configuration).meshList(query, userGroup, context, page, pageSize, options)(fetch, basePath);
    },
    /**
     * Fetches a list of meshes with winning permission optionally specifying page and the number of results to return per page.
     * @summary Use api/mesh/access-advisor/user/{username} instead
     * @param {string} username The name of the user to get mesh access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshMeshAccessAdvisor(username: string, query?: string, page?: number, pageSize?: number, options?: any) {
      return MeshApiFp(configuration).meshMeshAccessAdvisor(username, query, page, pageSize, options)(fetch, basePath);
    },
    /**
     * Fetches a list of meshes with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists role meshes with their winning permission
     * @param {string} code The code of the role to get mesh access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshMeshAccessAdvisorByRole(code: string, query?: string, page?: number, pageSize?: number, options?: any) {
      return MeshApiFp(configuration).meshMeshAccessAdvisorByRole(code, query, page, pageSize, options)(fetch, basePath);
    },
    /**
     * Fetches a list of meshes with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists user meshes with their winning permission
     * @param {string} username The name of the user to get mesh access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshMeshAccessAdvisorByUser(username: string, query?: string, page?: number, pageSize?: number, options?: any) {
      return MeshApiFp(configuration).meshMeshAccessAdvisorByUser(username, query, page, pageSize, options)(fetch, basePath);
    },
  };
};
