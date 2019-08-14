// tslint:disable
import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { DesignAddDesignInterfaceWebRequestModel } from './DesignAddDesignInterfaceWebRequestModel';
import { DesignCreateWebRequestModel } from './DesignCreateWebRequestModel';
import { DesignEditWebRequestModel } from './DesignEditWebRequestModel';
import { DesignRemoveDesignInterfaceWebRequestModel } from './DesignRemoveDesignInterfaceWebRequestModel';
import { DodiAttributeCreateWebRequestModel } from './DodiAttributeCreateWebRequestModel';
import { DodiAttributeDeleteWebRequestModel } from './DodiAttributeDeleteWebRequestModel';
import { DodiAttributeEditWebRequestModel } from './DodiAttributeEditWebRequestModel';
import { DodiPermissionsEditWebRequestModel } from './DodiPermissionsEditWebRequestModel';
import { DesignApi } from './DesignApi';
/**
 * DesignApi - fetch parameter creator
 * @export
 */
export const DesignApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * Adds an interface to the design with the specified code. After the interface has been added the design will include all the attributes that are part of that interface. Returns updated design.
     * @summary Add an interface to a design
     * @param {string} code The Guc of the design to add an interface to
     * @param {DesignAddDesignInterfaceWebRequestModel} model The model containing the details of the interface to add
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designAddDesignInterface(code: string, model: DesignAddDesignInterfaceWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling designAddDesignInterface.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling designAddDesignInterface.');
      }
      const localVarPath = `/api/design/{code}/interface`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"DesignAddDesignInterfaceWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Creates a design by using the information provided in the model
     * @summary Create a design
     * @param {DesignCreateWebRequestModel} model The model containing all the create details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designCreate(model: DesignCreateWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling designCreate.');
      }
      const localVarPath = `/api/design`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"DesignCreateWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Creates a design attribute using the information provided in the model
     * @summary Create a design attribute
     * @param {string} code The Guc of the design to create the attribute
     * @param {DodiAttributeCreateWebRequestModel} model The model containing the details of the attribute to create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designCreateDesignAttribute(code: string, model: DodiAttributeCreateWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling designCreateDesignAttribute.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling designCreateDesignAttribute.');
      }
      const localVarPath = `/api/design/{code}/attribute`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"DodiAttributeCreateWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Deletes the design matching the specified code
     * @summary Delete a design
     * @param {string} code The Guc of the design to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designDelete(code: string, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling designDelete.');
      }
      const localVarPath = `/api/design/{code}`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
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
    designDeleteDesignAttribute(code: string, attributeCode: string, model: DodiAttributeDeleteWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling designDeleteDesignAttribute.');
      }
      // verify required parameter 'attributeCode' is not null or undefined
      if (attributeCode === null || attributeCode === undefined) {
        throw new RequiredError('attributeCode','Required parameter attributeCode was null or undefined when calling designDeleteDesignAttribute.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling designDeleteDesignAttribute.');
      }
      const localVarPath = `/api/design/{code}/attribute/{attributeCode}`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)))
        .replace(`{${"attributeCode"}}`, encodeURIComponent(String(attributeCode)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"DodiAttributeDeleteWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Edits the design matching the specified code by using the provided details
     * @summary Edit a design
     * @param {string} code The Guc of the design to edit
     * @param {DesignEditWebRequestModel} model The model containing the edit details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designEdit(code: string, model: DesignEditWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling designEdit.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling designEdit.');
      }
      const localVarPath = `/api/design/{code}`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"DesignEditWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
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
    designEditDesignAttribute(code: string, attributeCode: string, model: DodiAttributeEditWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling designEditDesignAttribute.');
      }
      // verify required parameter 'attributeCode' is not null or undefined
      if (attributeCode === null || attributeCode === undefined) {
        throw new RequiredError('attributeCode','Required parameter attributeCode was null or undefined when calling designEditDesignAttribute.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling designEditDesignAttribute.');
      }
      const localVarPath = `/api/design/{code}/attribute/{attributeCode}`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)))
        .replace(`{${"attributeCode"}}`, encodeURIComponent(String(attributeCode)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"DodiAttributeEditWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Edit the permissions on the design with the specified code. New permissions will replace any existing permissions on both design and its attributes
     * @summary Edit permissions for a design and its attributes
     * @param {string} code The Guc of the design to edit the permissions of
     * @param {DodiPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designEditPermissions(code: string, model: DodiPermissionsEditWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling designEditPermissions.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling designEditPermissions.');
      }
      const localVarPath = `/api/design/{code}/permissions`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"DodiPermissionsEditWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Finds a design with the specified code
     * @summary Get a design by its Guc
     * @param {string} code The Guc to use to fetch the required design
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designGet(code: string, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling designGet.');
      }
      const localVarPath = `/api/design/{code}`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Finds the permissions of a design with the specified code
     * @summary Get the design permissions
     * @param {string} code The Guc to use to fetch the required design permissions
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designGetPermissions(code: string, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling designGetPermissions.');
      }
      const localVarPath = `/api/design/{code}/permissions`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
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
    designList(query?: string, context?: 'Core' | 'Module' | 'Customer', implementsInterface?: string, userGroup?: string, childDodi?: string, page?: number, pageSize?: number, options: any = {}): FetchArgs {
      const localVarPath = `/api/design`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      if (query !== undefined) {
        localVarQueryParameter['query'] = query;
      }

      if (context !== undefined) {
        localVarQueryParameter['context'] = context;
      }

      if (implementsInterface !== undefined) {
        localVarQueryParameter['implementsInterface'] = implementsInterface;
      }

      if (userGroup !== undefined) {
        localVarQueryParameter['userGroup'] = userGroup;
      }

      if (childDodi !== undefined) {
        localVarQueryParameter['childDodi'] = childDodi;
      }

      if (page !== undefined) {
        localVarQueryParameter['page'] = page;
      }

      if (pageSize !== undefined) {
        localVarQueryParameter['pageSize'] = pageSize;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
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
    designRemoveDesignInterface(code: string, interfaceCode: string, model: DesignRemoveDesignInterfaceWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling designRemoveDesignInterface.');
      }
      // verify required parameter 'interfaceCode' is not null or undefined
      if (interfaceCode === null || interfaceCode === undefined) {
        throw new RequiredError('interfaceCode','Required parameter interfaceCode was null or undefined when calling designRemoveDesignInterface.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling designRemoveDesignInterface.');
      }
      const localVarPath = `/api/design/{code}/interface/{interfaceCode}`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)))
        .replace(`{${"interfaceCode"}}`, encodeURIComponent(String(interfaceCode)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"DesignRemoveDesignInterfaceWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};
