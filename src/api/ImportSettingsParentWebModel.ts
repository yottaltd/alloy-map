
/**
 * Web model for import settings parent link
 * @export
 * @interface ImportSettingsParentWebModel
 */
export interface ImportSettingsParentWebModel {
  /**
   * The dodi code to connect the imported item(s) to
   * @type {string}
   * @memberof ImportSettingsParentWebModel
   */
  dodiCode: string;
  /**
   * The attribute code on the dodiCode parent to link the imported item(s) to
   * @type {string}
   * @memberof ImportSettingsParentWebModel
   */
  attributeCode: string;
  /**
   * The header name on the import item(s) to match against the parent matchAttributeCode to find it's respective parent
   * @type {string}
   * @memberof ImportSettingsParentWebModel
   */
  matchHeader: string;
  /**
   * The attribute code on the parent dodi to search on via the MatchHeader to help locate the parent item. This field is optional when MatchByItemId is used and set to true
   * @type {string}
   * @memberof ImportSettingsParentWebModel
   */
  matchAttributeCode?: string;
  /**
   * Optional flag to allow matching existing parent items by their item id specified in MatchHeader column of the import file. Multiple parents are supported by using pipe delimited format 'parentItemId1 | parentItemId2' Note this flag is mutually exclusive with MatchAttributeCode string
   * @type {boolean}
   * @memberof ImportSettingsParentWebModel
   */
  matchByItemId?: boolean;
}
