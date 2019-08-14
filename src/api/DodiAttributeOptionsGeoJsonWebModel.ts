// tslint:disable
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
}
