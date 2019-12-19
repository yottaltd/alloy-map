// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { MasterBackupRequestModel } from './MasterBackupRequestModel';
import { MasterCreateWebRequestModel } from './MasterCreateWebRequestModel';
import { MasterEditWebRequestModel } from './MasterEditWebRequestModel';
import { MasterMoveWebRequestModel } from './MasterMoveWebRequestModel';
import { SettingAddRequestModel } from './SettingAddRequestModel';
import { SettingEditRequestModel } from './SettingEditRequestModel';
import { ForgeMasterApiFp } from './ForgeMasterApiFp';
import { ForgeMasterApi } from './ForgeMasterApi';
/**
 * ForgeMasterApi - factory interface
 * @export
 */
export const ForgeMasterApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary add some master settings
     * @param {SettingAddRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterAddSetting(model: SettingAddRequestModel, options?: any) {
      return ForgeMasterApiFp(configuration).masterAddSetting(model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Create the master
     * @param {MasterCreateWebRequestModel} model Model containing the creation options
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterCreate(model: MasterCreateWebRequestModel, options?: any) {
      return ForgeMasterApiFp(configuration).masterCreate(model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Delete the master
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterDelete(options?: any) {
      return ForgeMasterApiFp(configuration).masterDelete(options)(fetch, basePath);
    },
    /**
     * 
     * @summary delete a backup
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterDeleteBackup(id: string, options?: any) {
      return ForgeMasterApiFp(configuration).masterDeleteBackup(id, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Change the master settings
     * @param {MasterEditWebRequestModel} model Model containing the edit options
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterEdit(model: MasterEditWebRequestModel, options?: any) {
      return ForgeMasterApiFp(configuration).masterEdit(model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary replace the master settings
     * @param {string} key 
     * @param {SettingEditRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterEditSetting(key: string, model: SettingEditRequestModel, options?: any) {
      return ForgeMasterApiFp(configuration).masterEditSetting(key, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get the master
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterGet(options?: any) {
      return ForgeMasterApiFp(configuration).masterGet(options)(fetch, basePath);
    },
    /**
     * 
     * @summary Backups List
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterListBackups(options?: any) {
      return ForgeMasterApiFp(configuration).masterListBackups(options)(fetch, basePath);
    },
    /**
     * 
     * @summary get master settings
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterListSettings(options?: any) {
      return ForgeMasterApiFp(configuration).masterListSettings(options)(fetch, basePath);
    },
    /**
     * 
     * @summary Move the regional master
     * @param {MasterMoveWebRequestModel} model Move operation arguments
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterMove(model: MasterMoveWebRequestModel, options?: any) {
      return ForgeMasterApiFp(configuration).masterMove(model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary remove some master settings
     * @param {string} key 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterRemoveSetting(key: string, options?: any) {
      return ForgeMasterApiFp(configuration).masterRemoveSetting(key, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Backup
     * @param {MasterBackupRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterStartBackup(model: MasterBackupRequestModel, options?: any) {
      return ForgeMasterApiFp(configuration).masterStartBackup(model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Restore
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    masterStartRestore(id: string, options?: any) {
      return ForgeMasterApiFp(configuration).masterStartRestore(id, options)(fetch, basePath);
    },
  };
};
