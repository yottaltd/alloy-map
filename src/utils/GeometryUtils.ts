import {
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';
import * as _ from 'lodash';
import OLPoint from 'ol/geom/Point';
import { AlloyMapError } from '../error/AlloyMapError';
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
   * Rounds all coordinates in the geometry to 6dp
   * @param geometry geometry to round coordinates for
   * @ignore
   * @internal
   */
  public static roundCoordinates(geometry: Geometry): void {
    switch (geometry.type) {
      case 'Point':
        const point = geometry as Point;
        point.coordinates = GeometryUtils.memoizedRoundCoordinate(point.coordinates);
        break;
      case 'MultiPoint':
        const multiPoint = geometry as MultiPoint;
        multiPoint.coordinates = multiPoint.coordinates.map((coordinate) =>
          GeometryUtils.memoizedRoundCoordinate(coordinate),
        );
        break;
      case 'LineString':
        const lineString = geometry as LineString;
        lineString.coordinates = lineString.coordinates.map((coordinate) =>
          GeometryUtils.memoizedRoundCoordinate(coordinate),
        );
        break;
      case 'MultiLineString':
        const multiLineString = geometry as MultiLineString;
        multiLineString.coordinates = multiLineString.coordinates.map((lineCoordinates) =>
          lineCoordinates.map((coordinate) => GeometryUtils.memoizedRoundCoordinate(coordinate)),
        );
        break;
      case 'Polygon':
        const polygon = geometry as Polygon;
        polygon.coordinates = polygon.coordinates.map((ringCoordinates) =>
          ringCoordinates.map((coordinate) => GeometryUtils.memoizedRoundCoordinate(coordinate)),
        );
        break;
      case 'MultiPolygon':
        const multiPolygon = geometry as MultiPolygon;
        multiPolygon.coordinates = multiPolygon.coordinates.map((polygonCoordinates) =>
          polygonCoordinates.map((ringCoordinates) =>
            ringCoordinates.map((coordinate) => GeometryUtils.memoizedRoundCoordinate(coordinate)),
          ),
        );
        break;
      case 'GeometryCollection':
        const geometryCollection = geometry as GeometryCollection;
        geometryCollection.geometries.forEach((subGeometry: Geometry) =>
          GeometryUtils.roundCoordinates(subGeometry),
        );
        break;
      default:
        throw new AlloyMapError(1559909581, 'Unsupported geometry type');
    }
  }

  /**
   * memoized version of `createIconCanvasImplementation`
   * @ignore
   * @internal
   */
  private static readonly memoizedRotateCoordinate = _.memoize(
    GeometryUtils.rotateCoordinateImplementation,
    // custom resolver because lodash only keys on the first argument
    (coordinate: [number, number], angleRadians: number, anchor: [number, number]) =>
      coordinate.join(',') + ':' + angleRadians + ':' + anchor.join(','),
  );

  /**
   * memoized version of `roundCoordinate`
   * @ignore
   * @internal
   */
  private static readonly memoizedRoundCoordinate = _.memoize(
    GeometryUtils.roundCoordinate,
    (coordinate: [number, number]) => coordinate.join(','),
  );

  /**
   * rounds all elements in the coordinate array to 6dp
   * @param coordinate number array
   * @returns `number[]` rounded coordinates
   * @ignore
   * @internal
   */
  private static roundCoordinate(coordinate: number[]): number[] {
    return coordinate.map((c) => parseFloat(c.toFixed(6)));
  }

  /**
   * the memoized implementation of `rotateCoordinate`
   * @ignore
   * @internal
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
