import { ImportSettingsBaseWebModel } from './ImportSettingsBaseWebModel';
/**
 * 
 * @export
 * @interface ImportSettingsStandardFormatWithNetworkWebModel
 */
export interface ImportSettingsStandardFormatWithNetworkWebModel extends ImportSettingsBaseWebModel {
  /**
   * Target network for network referencing
   * @type {string}
   * @memberof ImportSettingsStandardFormatWithNetworkWebModel
   */
  networkDesignCode: string;
}
