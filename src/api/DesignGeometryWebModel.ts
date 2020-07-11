import { GeoJSONObjectType } from './GeoJSONObjectType';
/**
 * Web model for design geometry
 * @export
 * @interface DesignGeometryWebModel
 */
export interface DesignGeometryWebModel {
  /**
   * The GeoJson types allowed for the item geometries
   * @type {Array<GeoJSONObjectType>}
   * @memberof DesignGeometryWebModel
   */
  allows: Array<GeoJSONObjectType>;
  /**
   * If true, items of this design need to have a geometry
   * @type {boolean}
   * @memberof DesignGeometryWebModel
   */
  required: boolean;
}
