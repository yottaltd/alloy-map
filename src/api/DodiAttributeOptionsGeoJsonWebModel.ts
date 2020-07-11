import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
import { GeoJSONObjectType } from './GeoJSONObjectType';
import { IGeometryObject } from './IGeometryObject';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsGeoJsonWebModel
 */
export interface DodiAttributeOptionsGeoJsonWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * The allowed geometries for this attribute
   * @type {Array<GeoJSONObjectType>}
   * @memberof DodiAttributeOptionsGeoJsonWebModel
   */
  allows: Array<GeoJSONObjectType>;
  /**
   * The optional default value of this attribute
   * @type {IGeometryObject}
   * @memberof DodiAttributeOptionsGeoJsonWebModel
   */
  defaultValue?: IGeometryObject;
}
