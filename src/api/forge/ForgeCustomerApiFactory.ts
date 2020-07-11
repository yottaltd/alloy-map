import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { CustomerAddUserRequestModel } from './CustomerAddUserRequestModel';
import { CustomerBackupRequestModel } from './CustomerBackupRequestModel';
import { CustomerCloneWebRequestModel } from './CustomerCloneWebRequestModel';
import { CustomerCreateWebRequestModel } from './CustomerCreateWebRequestModel';
import { CustomerEditUserRequestModel } from './CustomerEditUserRequestModel';
import { CustomerEditWebRequestModel } from './CustomerEditWebRequestModel';
import { CustomerMoveWebRequestModel } from './CustomerMoveWebRequestModel';
import { SettingSetRequestModel } from './SettingSetRequestModel';
import { ForgeCustomerApiFp } from './ForgeCustomerApiFp';
import { ForgeCustomerApi } from './ForgeCustomerApi';
/**
 * ForgeCustomerApi - factory interface
 * @export
 */
export const ForgeCustomerApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary Add a user to a customer
     * @param {string} id id of customer to add to
     * @param {CustomerAddUserRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerAddUser(id: string, model: CustomerAddUserRequestModel, options?: any) {
      return ForgeCustomerApiFp(configuration).customerAddUser(id, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Clone a customer
     * @param {string} id Id of the customer
     * @param {CustomerCloneWebRequestModel} model Clone operation arguments
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerClone(id: string, model: CustomerCloneWebRequestModel, options?: any) {
      return ForgeCustomerApiFp(configuration).customerClone(id, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Create a customer
     * @param {CustomerCreateWebRequestModel} model Model containing the creation options
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerCreate(model: CustomerCreateWebRequestModel, options?: any) {
      return ForgeCustomerApiFp(configuration).customerCreate(model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Delete a customer
     * @param {string} id Id of the customer
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerDelete(id: string, options?: any) {
      return ForgeCustomerApiFp(configuration).customerDelete(id, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Delete a backup
     * @param {string} backupId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerDeleteBackup(backupId: string, options?: any) {
      return ForgeCustomerApiFp(configuration).customerDeleteBackup(backupId, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Download a mongo backup dump file by its unique id
     * @param {string} backupId 
     * @param {boolean} [applyContentDispositionHeader] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerDownloadBackup(backupId: string, applyContentDispositionHeader?: boolean, options?: any) {
      return ForgeCustomerApiFp(configuration).customerDownloadBackup(backupId, applyContentDispositionHeader, options)(fetch, basePath);
    },
    /**
     * Edits a customer based on the information sent in the model
     * @summary Edit a customer's name or enabled state
     * @param {string} id Id of the customer
     * @param {CustomerEditWebRequestModel} model Model containing the new customer name and state
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerEdit(id: string, model: CustomerEditWebRequestModel, options?: any) {
      return ForgeCustomerApiFp(configuration).customerEdit(id, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Sets a customer setting
     * @param {string} id The customer id
     * @param {SettingSetRequestModel} model The model containing the info of the setting to set
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerEditSetting(id: string, model: SettingSetRequestModel, options?: any) {
      return ForgeCustomerApiFp(configuration).customerEditSetting(id, model, options)(fetch, basePath);
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
    customerEditUser(id: string, username: string, model: CustomerEditUserRequestModel, options?: any) {
      return ForgeCustomerApiFp(configuration).customerEditUser(id, username, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get a customer
     * @param {string} id Id of the customer
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerGet(id: string, options?: any) {
      return ForgeCustomerApiFp(configuration).customerGet(id, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get a backup by its unique id
     * @param {string} backupId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerGetBackup(backupId: string, options?: any) {
      return ForgeCustomerApiFp(configuration).customerGetBackup(backupId, options)(fetch, basePath);
    },
    /**
     * Fetches customer metrics by database name, see response model comments for details
     * @summary Get usage metrics for a customer by database name
     * @param {string} id The database name of the customer to retrieve metrics
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerGetMetrics(id: string, options?: any) {
      return ForgeCustomerApiFp(configuration).customerGetMetrics(id, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List customers on the region's master
     * @param {string} [query] Optional query to filter the customers by name
     * @param {string} [clusterId] Optional query to filter the customers by Cluster Id
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerList(query?: string, clusterId?: string, page?: number, pageSize?: number, options?: any) {
      return ForgeCustomerApiFp(configuration).customerList(query, clusterId, page, pageSize, options)(fetch, basePath);
    },
    /**
     * Fetches a paged list of backups sorted by backup taken date in reverse order, most recent first.
     * @summary List backups filtering by some optional query parameters, ordered by backup taken date in descending order
     * @param {number} [pageSize] Optional number of results to return per page, default 20
     * @param {string} [customerId] Optional Customer Id to exact match on (i.e. customer database name)
     * @param {string} [searchString] Optional search string to match within the backup Name or Database Name
     * @param {string} [beforeDateTime] Optional, return only backup files created before this date
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerListBackups(pageSize?: number, customerId?: string, searchString?: string, beforeDateTime?: string, options?: any) {
      return ForgeCustomerApiFp(configuration).customerListBackups(pageSize, customerId, searchString, beforeDateTime, options)(fetch, basePath);
    },
    /**
     * 
     * @summary get customer settings
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerListSettings(id: string, options?: any) {
      return ForgeCustomerApiFp(configuration).customerListSettings(id, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List users on a customer
     * @param {string} id id of customer 
     * @param {string} [query] Optional query to filter the users by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerListUsers(id: string, query?: string, page?: number, pageSize?: number, options?: any) {
      return ForgeCustomerApiFp(configuration).customerListUsers(id, query, page, pageSize, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Move a customer
     * @param {string} id Id of customer
     * @param {CustomerMoveWebRequestModel} model Move operation arguments
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerMove(id: string, model: CustomerMoveWebRequestModel, options?: any) {
      return ForgeCustomerApiFp(configuration).customerMove(id, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Remove a customer setting
     * @param {string} id 
     * @param {string} key 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerRemoveSetting(id: string, key: string, options?: any) {
      return ForgeCustomerApiFp(configuration).customerRemoveSetting(id, key, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Remove a user from a customer
     * @param {string} id id of customer 
     * @param {string} username id of user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerRemoveUser(id: string, username: string, options?: any) {
      return ForgeCustomerApiFp(configuration).customerRemoveUser(id, username, options)(fetch, basePath);
    },
    /**
     * Resets the recurring background tasks, useful if the tasks are not registered in the first place or are not the right ones
     * @summary Resets the recurring background tasks
     * @param {string} id The database name of the customer to reset the recurring background tasks for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerResetRecurringBackgroundTasks(id: string, options?: any) {
      return ForgeCustomerApiFp(configuration).customerResetRecurringBackgroundTasks(id, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Backup
     * @param {string} id 
     * @param {CustomerBackupRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerStartBackup(id: string, model: CustomerBackupRequestModel, options?: any) {
      return ForgeCustomerApiFp(configuration).customerStartBackup(id, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Restore
     * @param {string} customerId 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerStartRestore(customerId: string, id: string, options?: any) {
      return ForgeCustomerApiFp(configuration).customerStartRestore(customerId, id, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Makes sure that the customer database users match the master customer users
     * @param {string} id Id of customer
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerSyncNewMasterUsers(id: string, options?: any) {
      return ForgeCustomerApiFp(configuration).customerSyncNewMasterUsers(id, options)(fetch, basePath);
    },
  };
};
