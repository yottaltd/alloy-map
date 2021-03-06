import { BaseAPI } from './BaseAPI';
import { CustomerAddUserRequestModel } from './CustomerAddUserRequestModel';
import { CustomerBackupRequestModel } from './CustomerBackupRequestModel';
import { CustomerCloneWebRequestModel } from './CustomerCloneWebRequestModel';
import { CustomerCreateWebRequestModel } from './CustomerCreateWebRequestModel';
import { CustomerEditUserRequestModel } from './CustomerEditUserRequestModel';
import { CustomerEditWebRequestModel } from './CustomerEditWebRequestModel';
import { CustomerMoveWebRequestModel } from './CustomerMoveWebRequestModel';
import { SettingSetRequestModel } from './SettingSetRequestModel';
import { ForgeCustomerApiFp } from './ForgeCustomerApiFp';
/**
 * ForgeCustomerApi - object-oriented interface
 * @export
 * @class ForgeCustomerApi
 * @extends {BaseAPI}
 */
export class ForgeCustomerApi extends BaseAPI {
  /**
   * 
   * @summary Add a user to a customer
   * @param {string} id id of customer to add to
   * @param {CustomerAddUserRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerAddUser(id: string, model: CustomerAddUserRequestModel, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerAddUser(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Clone a customer
   * @param {string} id Id of the customer
   * @param {CustomerCloneWebRequestModel} model Clone operation arguments
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerClone(id: string, model: CustomerCloneWebRequestModel, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerClone(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Create a customer
   * @param {CustomerCreateWebRequestModel} model Model containing the creation options
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerCreate(model: CustomerCreateWebRequestModel, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Delete a customer
   * @param {string} id Id of the customer
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerDelete(id: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerDelete(id, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Delete a backup
   * @param {string} backupId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerDeleteBackup(backupId: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerDeleteBackup(backupId, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Download a mongo backup dump file by its unique id
   * @param {string} backupId 
   * @param {boolean} [applyContentDispositionHeader] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerDownloadBackup(backupId: string, applyContentDispositionHeader?: boolean, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerDownloadBackup(backupId, applyContentDispositionHeader, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a customer based on the information sent in the model
   * @summary Edit a customer's name or enabled state
   * @param {string} id Id of the customer
   * @param {CustomerEditWebRequestModel} model Model containing the new customer name and state
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerEdit(id: string, model: CustomerEditWebRequestModel, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerEdit(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Sets a customer setting
   * @param {string} id The customer id
   * @param {SettingSetRequestModel} model The model containing the info of the setting to set
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerEditSetting(id: string, model: SettingSetRequestModel, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerEditSetting(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a user on a specific customer
   * @summary Edits a user
   * @param {string} id The id of the customer the user to edit is on
   * @param {string} username The username of the user to edit
   * @param {CustomerEditUserRequestModel} model The model containing the info about the edit operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerEditUser(id: string, username: string, model: CustomerEditUserRequestModel, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerEditUser(id, username, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get a customer
   * @param {string} id Id of the customer
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerGet(id: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerGet(id, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get a backup by its unique id
   * @param {string} backupId 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerGetBackup(backupId: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerGetBackup(backupId, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches customer metrics by database name, see response model comments for details
   * @summary Get usage metrics for a customer by database name
   * @param {string} id The database name of the customer to retrieve metrics
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerGetMetrics(id: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerGetMetrics(id, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List customers on the region's master
   * @param {string} [query] Optional query to filter the customers by name
   * @param {string} [clusterId] Optional query to filter the customers by Cluster Id
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerList(query?: string, clusterId?: string, page?: number, pageSize?: number, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerList(query, clusterId, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a paged list of backups sorted by backup taken date in reverse order, most recent first.
   * @summary List backups filtering by some optional query parameters, ordered by backup taken date in descending order
   * @param {number} [pageSize] Optional number of results to return per page, default 20
   * @param {string} [customerId] Optional Customer Id to exact match on (i.e. customer database name)
   * @param {string} [searchString] Optional search string to match within the backup Name or Database Name
   * @param {string} [beforeDateTime] Optional, return only backup files created before this date
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerListBackups(pageSize?: number, customerId?: string, searchString?: string, beforeDateTime?: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerListBackups(pageSize, customerId, searchString, beforeDateTime, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary get customer settings
   * @param {string} id 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerListSettings(id: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerListSettings(id, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List users on a customer
   * @param {string} id id of customer 
   * @param {string} [query] Optional query to filter the users by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerListUsers(id: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerListUsers(id, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Move a customer
   * @param {string} id Id of customer
   * @param {CustomerMoveWebRequestModel} model Move operation arguments
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerMove(id: string, model: CustomerMoveWebRequestModel, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerMove(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Remove a customer setting
   * @param {string} id 
   * @param {string} key 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerRemoveSetting(id: string, key: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerRemoveSetting(id, key, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Remove a user from a customer
   * @param {string} id id of customer 
   * @param {string} username id of user
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerRemoveUser(id: string, username: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerRemoveUser(id, username, options)(this.fetch, this.basePath);
  }

  /**
   * Resets the recurring background tasks, useful if the tasks are not registered in the first place or are not the right ones
   * @summary Resets the recurring background tasks
   * @param {string} id The database name of the customer to reset the recurring background tasks for
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerResetRecurringBackgroundTasks(id: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerResetRecurringBackgroundTasks(id, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Backup
   * @param {string} id 
   * @param {CustomerBackupRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerStartBackup(id: string, model: CustomerBackupRequestModel, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerStartBackup(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Restore
   * @param {string} customerId 
   * @param {string} id 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerStartRestore(customerId: string, id: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerStartRestore(customerId, id, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Makes sure that the customer database users match the master customer users
   * @param {string} id Id of customer
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerSyncNewMasterUsers(id: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerSyncNewMasterUsers(id, options)(this.fetch, this.basePath);
  }

}
