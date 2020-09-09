
/**
 * Web model for dodi subtitle
 * @export
 * @interface DodiSubtitleWebModel
 */
export interface DodiSubtitleWebModel {
  /**
   * The optional subtitle to use to generate the subtitle for an item at runtime. Mustache notation can be used in this template with attribute codes within the curly braces. For example \"Light {{attributes_unitNumber}}\" will evaluate to \"Light 007\"
   * @type {string}
   * @memberof DodiSubtitleWebModel
   */
  value: string;
  /**
   * The parent dodi Guc, i.e. the dodi that defines this subtitle
   * @type {string}
   * @memberof DodiSubtitleWebModel
   */
  parent: string;
}
