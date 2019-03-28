// tslint:disable
import { GeoJSONObjectType } from './GeoJSONObjectType';
import { IGeometryObject } from './IGeometryObject';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsGeoJsonWebModel
 */
export interface DodiAttributeOptionsGeoJsonWebModel {
  /**
   * 
   * @type {Array<GeoJSONObjectType>}
   * @memberof DodiAttributeOptionsGeoJsonWebModel
   */
  allows: Array<GeoJSONObjectType>;
  /**
   * 
   * @type {IGeometryObject}
   * @memberof DodiAttributeOptionsGeoJsonWebModel
   */
  defaultValue?: IGeometryObject;
  /**
   * 
   * @type {string}
   * @memberof DodiAttributeOptionsGeoJsonWebModel
   */
  attributeType: string;
}
