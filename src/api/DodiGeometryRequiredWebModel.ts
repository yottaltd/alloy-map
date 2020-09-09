
/**
 * Web model for dodi geometry required
 * @export
 * @interface DodiGeometryRequiredWebModel
 */
export interface DodiGeometryRequiredWebModel {
  /**
   * If true, items of this design need to have a geometry
   * @type {boolean}
   * @memberof DodiGeometryRequiredWebModel
   */
  value: boolean;
  /**
   * The parent dodi Guc, i.e. the dodi that defines this geometry required flag
   * @type {string}
   * @memberof DodiGeometryRequiredWebModel
   */
  parent: string;
}
