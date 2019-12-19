// tslint:disable
import { ProfileDataUnitValueWebModelBase } from './ProfileDataUnitValueWebModelBase';
/**
 * Profile data unit value representing a basemap
 * @export
 * @interface Basemap
 */
export interface Basemap extends ProfileDataUnitValueWebModelBase {
  /**
   * The url of the basemap
   * @type {string}
   * @memberof Basemap
   */
  url: string;
  /**
   * Optional watermark string to show on the basemap
   * @type {string}
   * @memberof Basemap
   */
  watermark?: string;
}
