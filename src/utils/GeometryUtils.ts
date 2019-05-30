import { Geometry } from 'geojson';
import OLPoint from 'ol/geom/Point';
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

  /**
   * rotates a coordinate around the anchor
   * @param coordinate the coordinate to rotate
   * @param angleRadians the angle in radians to rotate
   * @param anchor the anchor point to rotate around
   */
  public static rotateCoordinate(
    coordinate: [number, number],
    angleRadians: number,
    anchor: [number, number],
  ): [number, number] {
    return GeometryUtils.memoizedRotateCoordinate(
      coordinate,
      angleRadians,
      anchor,
    ).slice() /* slice returns [] not [number, number] but we know it is so cast */ as [
      number,
      number
    ];
  }

  /**
   * memoized version of `createIconCanvasImplementation`
   */
  private static readonly memoizedRotateCoordinate = _.memoize(
    GeometryUtils.rotateCoordinateImplementation,
    // custom resolver because lodash only keys on the first argument
    (coordinate: [number, number], angleRadians: number, anchor: [number, number]) =>
      coordinate.join(',') + ':' + angleRadians + ':' + anchor.join(','),
  );

  /**
   * the memoized implementation of `rotateCoordinate`
   */
  private static rotateCoordinateImplementation(
    coordinate: [number, number],
    angleRadians: number,
    anchor: [number, number],
  ): [number, number] {
    const p = new OLPoint(coordinate);
    p.rotate(angleRadians, anchor);
    return p.getCoordinates();
  }
}
