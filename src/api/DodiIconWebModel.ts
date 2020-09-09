
/**
 * Web model for dodi icon
 * @export
 * @interface DodiIconWebModel
 */
export interface DodiIconWebModel {
  /**
   * The default dodi icon code
   * @type {string}
   * @memberof DodiIconWebModel
   */
  value: string;
  /**
   * The parent dodi Guc, i.e. the dodi that defines this icon
   * @type {string}
   * @memberof DodiIconWebModel
   */
  parent: string;
}
