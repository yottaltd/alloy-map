import { GeoJSONObjectType } from './GeoJSONObjectType';
/**
 * Web model for dodi geometry allowed types
 * @export
 * @interface DodiGeometryAllowsWebModel
 */
export interface DodiGeometryAllowsWebModel {
  /**
   * The GeoJson types allowed for the item geometries
   * @type {Array<GeoJSONObjectType>}
   * @memberof DodiGeometryAllowsWebModel
   */
  values: Array<GeoJSONObjectType>;
  /**
   * The parent dodi Guc, i.e. the dodi that defines this geometry allowed types
   * @type {string}
   * @memberof DodiGeometryAllowsWebModel
   */
  parent: string;
}
