// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { CustomerAddUserRequestModel } from './CustomerAddUserRequestModel';
import { CustomerAddUserResponseModel } from './CustomerAddUserResponseModel';
import { CustomerBackupListWebResponseModel } from './CustomerBackupListWebResponseModel';
import { CustomerBackupRequestModel } from './CustomerBackupRequestModel';
import { CustomerCloneWebRequestModel } from './CustomerCloneWebRequestModel';
import { CustomerCreateWebRequestModel } from './CustomerCreateWebRequestModel';
import { CustomerCreateWebResponseModel } from './CustomerCreateWebResponseModel';
import { CustomerEditUserRequestModel } from './CustomerEditUserRequestModel';
import { CustomerEditWebRequestModel } from './CustomerEditWebRequestModel';
import { CustomerEditWebResponseModel } from './CustomerEditWebResponseModel';
import { CustomerGetForgeMetricsWebResponseModel } from './CustomerGetForgeMetricsWebResponseModel';
import { CustomerGetWebResponseModel } from './CustomerGetWebResponseModel';
import { CustomerListUserResponseModel } from './CustomerListUserResponseModel';
import { CustomerListWebResponseModel } from './CustomerListWebResponseModel';
import { CustomerMoveWebRequestModel } from './CustomerMoveWebRequestModel';
import { SettingListResponseModel } from './SettingListResponseModel';
import { SettingSetRequestModel } from './SettingSetRequestModel';
import { TaskSubmittedResponseModel } from './TaskSubmittedResponseModel';
import { ForgeCustomerApiFetchParamCreator } from './ForgeCustomerApiFetchParamCreator';
import { ForgeCustomerApi } from './ForgeCustomerApi';
/**
 * ForgeCustomerApi - functional programming interface
 * @export
 */
export const ForgeCustomerApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Add a user to a customer
     * @param {string} id id of customer to add to
     * @param {CustomerAddUserRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerAddUser(id: string, model: CustomerAddUserRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomerAddUserResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerAddUser(id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Clone a customer
     * @param {string} id Id of the customer
     * @param {CustomerCloneWebRequestModel} model Clone operation arguments
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerClone(id: string, model: CustomerCloneWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TaskSubmittedResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerClone(id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Create a customer
     * @param {CustomerCreateWebRequestModel} model Model containing the creation options
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerCreate(model: CustomerCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomerCreateWebResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerCreate(model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Delete a customer
     * @param {string} id Id of the customer
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerDelete(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerDelete(id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Delete a backup
     * @param {string} backupId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerDeleteBackup(backupId: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerDeleteBackup(backupId, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
    /**
     * Edits a customer based on the information sent in the model
     * @summary Edit a customer's name or enabled state
     * @param {string} id Id of the customer
     * @param {CustomerEditWebRequestModel} model Model containing the new customer name and state
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerEdit(id: string, model: CustomerEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomerEditWebResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerEdit(id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Sets a customer setting
     * @param {string} id The customer id
     * @param {SettingSetRequestModel} model The model containing the info of the setting to set
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerEditSetting(id: string, model: SettingSetRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerEditSetting(id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
    /**
     * Edits a user on a specific customer
     * @summary Edits a user
     * @param {string} id The id of the customer the user to edit is on
     * @param {string} username The username of the user to edit
     * @param {CustomerEditUserRequestModel} model The model containing the info about the edit operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerEditUser(id: string, username: string, model: CustomerEditUserRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerEditUser(id, username, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Get a customer
     * @param {string} id Id of the customer
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerGet(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomerGetWebResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerGet(id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Fetches customer metrics by database name, see response model comments for details
     * @summary Get usage metrics for a customer by database name
     * @param {string} id The database name of the customer to retrieve metrics
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerGetMetrics(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomerGetForgeMetricsWebResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerGetMetrics(id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary List customers on the region's master
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerList(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomerListWebResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerList(options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Backups List
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerListBackups(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomerBackupListWebResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerListBackups(id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary get customer settings
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerListSettings(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SettingListResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerListSettings(id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary List users on a customer
     * @param {string} id id of customer 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerListUsers(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomerListUserResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerListUsers(id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Move a customer
     * @param {string} id Id of customer
     * @param {CustomerMoveWebRequestModel} model Move operation arguments
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerMove(id: string, model: CustomerMoveWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TaskSubmittedResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerMove(id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Remove a customer setting
     * @param {string} id 
     * @param {string} key 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerRemoveSetting(id: string, key: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerRemoveSetting(id, key, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Remove a user from a customer
     * @param {string} id id of customer 
     * @param {string} username id of user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerRemoveUser(id: string, username: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerRemoveUser(id, username, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Backup
     * @param {string} id 
     * @param {CustomerBackupRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerStartBackup(id: string, model: CustomerBackupRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TaskSubmittedResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerStartBackup(id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Restore
     * @param {string} customerId 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerStartRestore(customerId: string, id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TaskSubmittedResponseModel> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerStartRestore(customerId, id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Makes sure that the customer database users match the master customer users
     * @param {string} id Id of customer
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerSyncNewMasterUsers(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeCustomerApiFetchParamCreator(configuration).customerSyncNewMasterUsers(id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
  }
};
