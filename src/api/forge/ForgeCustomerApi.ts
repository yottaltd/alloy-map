// tslint:disable
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
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerList(options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerList(options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Backups List
   * @param {string} id 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerListBackups(id: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerListBackups(id, options)(this.fetch, this.basePath);
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
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeCustomerApi
   */
  public customerListUsers(id: string, options?: any) {
    return ForgeCustomerApiFp(this.configuration).customerListUsers(id, options)(this.fetch, this.basePath);
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
