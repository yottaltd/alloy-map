
/**
 * Web model for dodi colour
 * @export
 * @interface DodiColourWebModel
 */
export interface DodiColourWebModel {
  /**
   * The default dodi colour in the format #123456
   * @type {string}
   * @memberof DodiColourWebModel
   */
  value: string;
  /**
   * The parent dodi Guc, i.e. the dodi that defines this colour
   * @type {string}
   * @memberof DodiColourWebModel
   */
  parent: string;
}
