
/**
 * Web model for dodi title
 * @export
 * @interface DodiTitleWebModel
 */
export interface DodiTitleWebModel {
  /**
   * The title template to use to generate the title for an item at runtime. Mustache notation can be used in this template with attribute codes within the curly braces. For example \"Job-{{attributes_jobNumber}}\" will evaluate to \"Job-1232\"
   * @type {string}
   * @memberof DodiTitleWebModel
   */
  value: string;
  /**
   * The parent dodi Guc, i.e. the dodi that defines this title
   * @type {string}
   * @memberof DodiTitleWebModel
   */
  parent: string;
}
