import { Geometry } from 'geojson';
import { GeoJSONObjectType } from '../../api/GeoJSONObjectType';

export abstract class GeometryGuards {
  public static isGeometry(geometry: any): geometry is Geometry {
    if (geometry.hasOwnProperty('type')) {
      if (geometry.type === GeoJSONObjectType.GeometryCollection) {
        return geometry.hasOwnProperty('geometries');
      } else {
        return geometry.hasOwnProperty('coordinates');
      }
    }
    return false;
  }
}
