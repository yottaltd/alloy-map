// tslint:disable

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
   * If the attribute is of type LINK then this value indicates the matching attribute code on the destination design to look for matches against the import rows value. If a match is found a link will be made
   * @type {string}
   * @memberof ImportSettingsAttributeWebModel
   */
  matchCode?: string;
  /**
   * Optional flag for LINK attributes, represents link attribute to an item AId. Note this flag is mutually exclusive with MatchCode string
   * @type {boolean}
   * @memberof ImportSettingsAttributeWebModel
   */
  matchByItemId?: boolean;
  /**
   * This value indicates the projection of the geometry attribute, must be a valid proj4 string
   * @type {string}
   * @memberof ImportSettingsAttributeWebModel
   */
  proj4?: string;
}
