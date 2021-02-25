import { GeoJSONObjectType } from '@/api/GeoJSONObjectType';
import { Geometry } from 'geojson';

export abstract class GeometryGuards {
  public static isGeometry(geometry: Record<string, any>): geometry is Geometry {
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
