
/**
 * Web model for a dodi implements object
 * @export
 * @interface DodiImplementsWebModel
 */
export interface DodiImplementsWebModel {
  /**
   * The Guc of the implemented design interface
   * @type {string}
   * @memberof DodiImplementsWebModel
   */
  code: string;
  /**
   * The parent dodi Guc, i.e. the dodi that defines that this should be implemented
   * @type {string}
   * @memberof DodiImplementsWebModel
   */
  parent: string;
}
