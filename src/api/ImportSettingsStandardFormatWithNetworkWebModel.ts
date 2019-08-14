// tslint:disable
import { ImportSettingsBaseWebModel } from './ImportSettingsBaseWebModel';
/**
 * Web model for standard-format import settings
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
