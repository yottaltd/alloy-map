import { BaseAPI } from './BaseAPI';
import { MasterBackupRequestModel } from './MasterBackupRequestModel';
import { MasterCreateWebRequestModel } from './MasterCreateWebRequestModel';
import { MasterEditWebRequestModel } from './MasterEditWebRequestModel';
import { MasterMoveWebRequestModel } from './MasterMoveWebRequestModel';
import { SettingAddRequestModel } from './SettingAddRequestModel';
import { SettingEditRequestModel } from './SettingEditRequestModel';
import { ForgeMasterApiFp } from './ForgeMasterApiFp';
/**
 * ForgeMasterApi - object-oriented interface
 * @export
 * @class ForgeMasterApi
 * @extends {BaseAPI}
 */
export class ForgeMasterApi extends BaseAPI {
  /**
   * 
   * @summary add some master settings
   * @param {SettingAddRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterAddSetting(model: SettingAddRequestModel, options?: any) {
    return ForgeMasterApiFp(this.configuration).masterAddSetting(model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Create the master
   * @param {MasterCreateWebRequestModel} model Model containing the creation options
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterCreate(model: MasterCreateWebRequestModel, options?: any) {
    return ForgeMasterApiFp(this.configuration).masterCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Delete the master
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterDelete(options?: any) {
    return ForgeMasterApiFp(this.configuration).masterDelete(options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary delete a backup
   * @param {string} id 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterDeleteBackup(id: string, options?: any) {
    return ForgeMasterApiFp(this.configuration).masterDeleteBackup(id, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Change the master settings
   * @param {MasterEditWebRequestModel} model Model containing the edit options
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterEdit(model: MasterEditWebRequestModel, options?: any) {
    return ForgeMasterApiFp(this.configuration).masterEdit(model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary replace the master settings
   * @param {string} key 
   * @param {SettingEditRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterEditSetting(key: string, model: SettingEditRequestModel, options?: any) {
    return ForgeMasterApiFp(this.configuration).masterEditSetting(key, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get the master
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterGet(options?: any) {
    return ForgeMasterApiFp(this.configuration).masterGet(options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Backups List
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterListBackups(page?: number, pageSize?: number, options?: any) {
    return ForgeMasterApiFp(this.configuration).masterListBackups(page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary get master settings
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterListSettings(options?: any) {
    return ForgeMasterApiFp(this.configuration).masterListSettings(options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Move the regional master
   * @param {MasterMoveWebRequestModel} model Move operation arguments
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterMove(model: MasterMoveWebRequestModel, options?: any) {
    return ForgeMasterApiFp(this.configuration).masterMove(model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary remove some master settings
   * @param {string} key 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterRemoveSetting(key: string, options?: any) {
    return ForgeMasterApiFp(this.configuration).masterRemoveSetting(key, options)(this.fetch, this.basePath);
  }

  /**
   * Resets the recurring background tasks for the entire region and it should thus be used with care
   * @summary Resets the recurring background tasks for the region
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterResetRecurringBackgroundTasks(options?: any) {
    return ForgeMasterApiFp(this.configuration).masterResetRecurringBackgroundTasks(options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Backup
   * @param {MasterBackupRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterStartBackup(model: MasterBackupRequestModel, options?: any) {
    return ForgeMasterApiFp(this.configuration).masterStartBackup(model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Restore
   * @param {string} id 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeMasterApi
   */
  public masterStartRestore(id: string, options?: any) {
    return ForgeMasterApiFp(this.configuration).masterStartRestore(id, options)(this.fetch, this.basePath);
  }

}
