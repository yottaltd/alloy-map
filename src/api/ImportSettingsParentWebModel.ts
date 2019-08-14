// tslint:disable

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
   * The attribute code on the parent dodi to search on via the matchHeader to help locate the parent item
   * @type {string}
   * @memberof ImportSettingsParentWebModel
   */
  matchAttributeCode: string;
}
