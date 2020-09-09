
/**
 * Web model for import settings attributes
 * @export
 * @interface ImportSettingsAttributeWebModel
 */
export interface ImportSettingsAttributeWebModel {
  /**
   * The header name on the import to map from
   * @type {string}
   * @memberof ImportSettingsAttributeWebModel
   */
  header: string;
  /**
   * The destination attribute to import to, it must exist on the design being imported into
   * @type {string}
   * @memberof ImportSettingsAttributeWebModel
   */
  code: string;
  /**
   * If the attribute is of type Link then this value indicates the matching attribute code on the destination design to look for matches against the import rows value. If a match is found a link will be made
   * @type {string}
   * @memberof ImportSettingsAttributeWebModel
   */
  matchCode?: string;
  /**
   * Optional flag for Link attributes, represents link attribute to an item AId. Note this flag is mutually exclusive with MatchCode string.
   * @type {boolean}
   * @memberof ImportSettingsAttributeWebModel
   */
  matchByItemId?: boolean;
  /**
   * Optional flag for Link attributes, used during import update or upsert modes. If not set, defaults to false.  If true this means we'll be patching the link attribute to make sure it includes the given child item(s) (any existing child items in the link not covered by the patch will remain).  If false this means we'll be setting the link attribute to the given child item(s) (any existing child items in the link not covered by the patch will be removed).
   * @type {boolean}
   * @memberof ImportSettingsAttributeWebModel
   */
  patchLink?: boolean;
  /**
   * This value indicates the projection of the geometry attribute, must be a valid proj4 string
   * @type {string}
   * @memberof ImportSettingsAttributeWebModel
   */
  proj4?: string;
}
