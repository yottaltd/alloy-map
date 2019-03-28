// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { DesignInterfaceAttributePermissionsEditWebRequestModel } from './DesignInterfaceAttributePermissionsEditWebRequestModel';
import { DesignInterfaceApiFp } from './DesignInterfaceApiFp';
import { DesignInterfaceApi } from './DesignInterfaceApi';
/**
 * DesignInterfaceApi - factory interface
 * @export
 */
export const DesignInterfaceApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Edit the permissions on the design interface attribute with the specified code
     * @summary Edit permissions for a design interface attribute
     * @param {string} code The Guc of the design interface with the attribute to edit the permissions of
     * @param {string} attributeCode The Guc of the design interface attribute to edit the permissions of
     * @param {DesignInterfaceAttributePermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designInterfaceEditAttributePermissions(code: string, attributeCode: string, model: DesignInterfaceAttributePermissionsEditWebRequestModel, options?: any) {
      return DesignInterfaceApiFp(configuration).designInterfaceEditAttributePermissions(code, attributeCode, model, options)(fetch, basePath);
    },
    /**
     * Finds the design interface with the specified code
     * @summary Get a design interface
     * @param {string} code The Guc of the interface to fetch
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designInterfaceGet(code: string, options?: any) {
      return DesignInterfaceApiFp(configuration).designInterfaceGet(code, options)(fetch, basePath);
    },
    /**
     * Finds the permissions of a design with the specified code
     * @summary Get the design permissions
     * @param {string} code The Guc to use to fetch the required design permissions
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designInterfaceGetPermissions(code: string, options?: any) {
      return DesignInterfaceApiFp(configuration).designInterfaceGetPermissions(code, options)(fetch, basePath);
    },
    /**
     * Lists the interfaces in the system using pagination
     * @summary List design interfaces
     * @param {string} [query] Optional query to filter the designs by
     * @param {string} [implementedByDodi] The optional dodi code Guc, if specified, only the interfaces implemented by that design or interface will be returned
     * @param {string} [implementsInterface] The optional dodi code Guc, if specified, only the interfaces implementing that interface will be returned
     * @param {string} [userGroup] The optional user group Guc. If specified, only the interfaces that have this user group code within their permissions or the permissions of the attributes within them are returned
     * @param {string} [childDodi] Optional Guc to filter design interfaces by. If specified, only the designs that have a link attribute pointing to the specified dodi are returned
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designInterfaceList(query?: string, implementedByDodi?: string, implementsInterface?: string, userGroup?: string, childDodi?: string, page?: number, pageSize?: number, options?: any) {
      return DesignInterfaceApiFp(configuration).designInterfaceList(query, implementedByDodi, implementsInterface, userGroup, childDodi, page, pageSize, options)(fetch, basePath);
    },
  };
};
