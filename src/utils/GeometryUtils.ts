import { Geometry } from 'geojson';
import { AlloyBounds } from '../map/core/AlloyBounds';
import { ProjectionUtils } from './ProjectionUtils';

/**
 * utils for geometry
 */
export abstract class GeometryUtils {
  /**
   * Gets geometry extent bounds
   * @param geometry geometry for which to get bounds
   * @returns AlloyBounds that wraps geometry
   */
  public static getGeometryBounds(geometry: Geometry): AlloyBounds {
    return AlloyBounds.fromMapExtent(ProjectionUtils.GEOJSON.readGeometry(geometry).getExtent());
  }
}
