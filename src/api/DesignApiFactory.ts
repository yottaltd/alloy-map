// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { DesignAddDesignInterfaceWebRequestModel } from './DesignAddDesignInterfaceWebRequestModel';
import { DesignAttributePermissionsEditWebRequestModel } from './DesignAttributePermissionsEditWebRequestModel';
import { DesignCreateWebRequestModel } from './DesignCreateWebRequestModel';
import { DesignEditWebRequestModel } from './DesignEditWebRequestModel';
import { DesignPermissionsEditWebRequestModel } from './DesignPermissionsEditWebRequestModel';
import { DesignRemoveDesignInterfaceWebRequestModel } from './DesignRemoveDesignInterfaceWebRequestModel';
import { DodiAttributeCreateWebRequestModel } from './DodiAttributeCreateWebRequestModel';
import { DodiAttributeDeleteWebRequestModel } from './DodiAttributeDeleteWebRequestModel';
import { DodiAttributeEditWebRequestModel } from './DodiAttributeEditWebRequestModel';
import { DesignApiFp } from './DesignApiFp';
import { DesignApi } from './DesignApi';
/**
 * DesignApi - factory interface
 * @export
 */
export const DesignApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Adds an interface to the design with the specified code. After the interface has been added the design will include all the attributes that are part of that interface. Returns updated design.
     * @summary Add an interface to a design
     * @param {string} code The Guc of the design to add an interface to
     * @param {DesignAddDesignInterfaceWebRequestModel} model The model containing the details of the interface to add
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designAddDesignInterface(code: string, model: DesignAddDesignInterfaceWebRequestModel, options?: any) {
      return DesignApiFp(configuration).designAddDesignInterface(code, model, options)(fetch, basePath);
    },
    /**
     * Creates a design by using the information provided in the model
     * @summary Create a design
     * @param {DesignCreateWebRequestModel} model The model containing all the create details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designCreate(model: DesignCreateWebRequestModel, options?: any) {
      return DesignApiFp(configuration).designCreate(model, options)(fetch, basePath);
    },
    /**
     * Creates a design attribute using the information provided in the model
     * @summary Create a design attribute
     * @param {string} code The Guc of the design to create the attribute
     * @param {DodiAttributeCreateWebRequestModel} model The model containing the details of the attribute to create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designCreateDesignAttribute(code: string, model: DodiAttributeCreateWebRequestModel, options?: any) {
      return DesignApiFp(configuration).designCreateDesignAttribute(code, model, options)(fetch, basePath);
    },
    /**
     * Deletes the design matching the specified code
     * @summary Delete a design
     * @param {string} code The Guc of the design to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designDelete(code: string, options?: any) {
      return DesignApiFp(configuration).designDelete(code, options)(fetch, basePath);
    },
    /**
     * Finds and removes the specified attribute from the design with the provided code
     * @summary Delete a design attribute
     * @param {string} code The Guc of the design to delete the attribute from
     * @param {string} attributeCode The Guc of the attribute to delete
     * @param {DodiAttributeDeleteWebRequestModel} model The model containing the signature necessary to delete a design attribute
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designDeleteDesignAttribute(code: string, attributeCode: string, model: DodiAttributeDeleteWebRequestModel, options?: any) {
      return DesignApiFp(configuration).designDeleteDesignAttribute(code, attributeCode, model, options)(fetch, basePath);
    },
    /**
     * Edits the design matching the specified code by using the provided details
     * @summary Edit a design
     * @param {string} code The Guc of the design to edit
     * @param {DesignEditWebRequestModel} model The model containing the edit details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designEdit(code: string, model: DesignEditWebRequestModel, options?: any) {
      return DesignApiFp(configuration).designEdit(code, model, options)(fetch, basePath);
    },
    /**
     * Edit the permissions on the design attribute with the specified code
     * @summary Edit permissions for a design attribute
     * @param {string} code The Guc of the design with the attribute to edit the permissions of
     * @param {string} attributeCode The Guc of the design attribute to edit the permissions of
     * @param {DesignAttributePermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designEditAttributePermissions(code: string, attributeCode: string, model: DesignAttributePermissionsEditWebRequestModel, options?: any) {
      return DesignApiFp(configuration).designEditAttributePermissions(code, attributeCode, model, options)(fetch, basePath);
    },
    /**
     * Edits a design attribute using the information provided in the model
     * @summary Edit a design attribute
     * @param {string} code The Guc of the design to edit the attribute
     * @param {string} attributeCode The code of the attribute to edit
     * @param {DodiAttributeEditWebRequestModel} model The attribute edit model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designEditDesignAttribute(code: string, attributeCode: string, model: DodiAttributeEditWebRequestModel, options?: any) {
      return DesignApiFp(configuration).designEditDesignAttribute(code, attributeCode, model, options)(fetch, basePath);
    },
    /**
     * Edit the permissions on the design with the specified code
     * @summary Edit permissions for a design
     * @param {string} code The Guc of the design to edit the permissions of
     * @param {DesignPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designEditPermissions(code: string, model: DesignPermissionsEditWebRequestModel, options?: any) {
      return DesignApiFp(configuration).designEditPermissions(code, model, options)(fetch, basePath);
    },
    /**
     * Finds a design with the specified code
     * @summary Get a design by its Guc
     * @param {string} code The Guc to use to fetch the required design
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designGet(code: string, options?: any) {
      return DesignApiFp(configuration).designGet(code, options)(fetch, basePath);
    },
    /**
     * Finds the permissions of a design with the specified code
     * @summary Get the design permissions
     * @param {string} code The Guc to use to fetch the required design permissions
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designGetPermissions(code: string, options?: any) {
      return DesignApiFp(configuration).designGetPermissions(code, options)(fetch, basePath);
    },
    /**
     * List designs with optional filters on Context and a string query
     * @summary List and filter designs
     * @param {string} [query] Optional query to filter the designs by
     * @param {'Core' | 'Module' | 'Customer'} [context] Optional Context filter
     * @param {string} [implementsInterface] The optional dodi code Guc, if specified, only the designs implementing that interface will be returned
     * @param {string} [userGroup] Optional Guc to filter designs by. If specified, only the designs that have this user group code within their permissions or the permissions of the attributes within them are returned
     * @param {string} [childDodi] Optional Guc to filter designs by. If specified, only the designs that have a link attribute pointing to the specified dodi are returned
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designList(query?: string, context?: 'Core' | 'Module' | 'Customer', implementsInterface?: string, userGroup?: string, childDodi?: string, page?: number, pageSize?: number, options?: any) {
      return DesignApiFp(configuration).designList(query, context, implementsInterface, userGroup, childDodi, page, pageSize, options)(fetch, basePath);
    },
    /**
     * Removes an interface from the ones the design implements. This does not remove the interface itself from the system. However all the item attributes belonging to the interface being removed will be deleted from all the items belonging to the design. This is an unaudited change and it will not be possible to bring those values back. Returns updated design.
     * @summary Remove an interface from a design
     * @param {string} code The Guc of the design to remove an interface from
     * @param {string} interfaceCode The Guc of the interface to be removed
     * @param {DesignRemoveDesignInterfaceWebRequestModel} model The model containing the signature necessary to remove an interface from a design
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designRemoveDesignInterface(code: string, interfaceCode: string, model: DesignRemoveDesignInterfaceWebRequestModel, options?: any) {
      return DesignApiFp(configuration).designRemoveDesignInterface(code, interfaceCode, model, options)(fetch, basePath);
    },
  };
};
