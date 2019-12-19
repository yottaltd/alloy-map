// tslint:disable
import { FavouriteFeatureName } from './FavouriteFeatureName';
import { ProfileDataUnitValueWebModelBase } from './ProfileDataUnitValueWebModelBase';
/**
 * Profile data unit value representing a favourite item
 * @export
 * @interface FavouriteItem
 */
export interface FavouriteItem extends ProfileDataUnitValueWebModelBase {
  /**
   * The AId of the favourite item
   * @type {string}
   * @memberof FavouriteItem
   */
  alloyId?: string;
  /**
   * The Guc of the favourite item
   * @type {string}
   * @memberof FavouriteItem
   */
  code?: string;
  /**
   * The feature of the favourite item
   * @type {FavouriteFeatureName}
   * @memberof FavouriteItem
   */
  featureName: FavouriteFeatureName;
}
