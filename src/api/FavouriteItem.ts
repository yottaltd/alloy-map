import { FavouriteFeatureName } from './FavouriteFeatureName';
import { ProfileDataUnitValueWebModelBase } from './ProfileDataUnitValueWebModelBase';
/**
 * 
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
  /**
   * The colour of the favourite item
   * @type {string}
   * @memberof FavouriteItem
   */
  colour?: string;
  /**
   * The icon of the favourite item
   * @type {string}
   * @memberof FavouriteItem
   */
  icon?: string;
  /**
   * The title of the favourite item
   * @type {string}
   * @memberof FavouriteItem
   */
  title?: string;
  /**
   * The subtitle of the favourite item
   * @type {string}
   * @memberof FavouriteItem
   */
  subtitle?: string;
}
