import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { MasterBackupRequestModel } from './MasterBackupRequestModel';
import { MasterCreateWebRequestModel } from './MasterCreateWebRequestModel';
import { MasterEditWebRequestModel } from './MasterEditWebRequestModel';
import { MasterGetWebResponseModel } from './MasterGetWebResponseModel';
import { MasterMoveWebRequestModel } from './MasterMoveWebRequestModel';
import { SettingAddRequestModel } from './SettingAddRequestModel';
import { SettingEditRequestModel } from './SettingEditRequestModel';
import { SettingListResponseModel } from './SettingListResponseModel';
import { TaskSubmittedResponseModel } from './TaskSubmittedResponseModel';
import { MasterBackupListWebResponseModel } from './MasterBackupListWebResponseModel';
import { ForgeMasterApiFetchParamCreator } from './ForgeMasterApiFetchParamCreator';
import { ForgeMasterApi } from './ForgeMasterApi';
/**
 * ForgeMasterApi - functional programming interface
 * @export
 */
export const ForgeMasterApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary add some master settings
     * @param {SettingAddRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterAddSetting(model: SettingAddRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterAddSetting(model, options);
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
     * @summary Create the master
     * @param {MasterCreateWebRequestModel} model Model containing the creation options
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterCreate(model: MasterCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterCreate(model, options);
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
     * @summary Delete the master
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterDelete(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterDelete(options);
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
     * @summary delete a backup
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterDeleteBackup(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterDeleteBackup(id, options);
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
     * @summary Change the master settings
     * @param {MasterEditWebRequestModel} model Model containing the edit options
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterEdit(model: MasterEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterEdit(model, options);
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
     * @summary replace the master settings
     * @param {string} key 
     * @param {SettingEditRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterEditSetting(key: string, model: SettingEditRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterEditSetting(key, model, options);
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
     * @summary Get the master
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MasterGetWebResponseModel> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterGet(options);
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
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterListBackups(page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MasterBackupListWebResponseModel> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterListBackups(page, pageSize, options);
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
     * @summary get master settings
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterListSettings(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SettingListResponseModel> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterListSettings(options);
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
     * @summary Move the regional master
     * @param {MasterMoveWebRequestModel} model Move operation arguments
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterMove(model: MasterMoveWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TaskSubmittedResponseModel> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterMove(model, options);
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
     * @summary remove some master settings
     * @param {string} key 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterRemoveSetting(key: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterRemoveSetting(key, options);
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
     * Resets the recurring background tasks for the entire region and it should thus be used with care
     * @summary Resets the recurring background tasks for the region
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterResetRecurringBackgroundTasks(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterResetRecurringBackgroundTasks(options);
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
     * @param {MasterBackupRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterStartBackup(model: MasterBackupRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TaskSubmittedResponseModel> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterStartBackup(model, options);
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
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterStartRestore(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TaskSubmittedResponseModel> {
      const localVarFetchArgs = ForgeMasterApiFetchParamCreator(configuration).masterStartRestore(id, options);
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
  }
};
