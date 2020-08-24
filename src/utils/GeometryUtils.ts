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
import { Coordinate as OLCoordinate } from 'ol/coordinate';
import OLGeometry from 'ol/geom/Geometry';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLGeometryType from 'ol/geom/GeometryType';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import { AlloyMapError } from '../error/AlloyMapError';
import { AlloyBounds } from '../map/core/AlloyBounds';
import { AlloyFeature } from '../map/features/AlloyFeature';
import { MathUtils } from './MathUtils';
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
   * Gets geometry extent bounds for a feature
   * @param feature geature for which to get bounds
   * @returns AlloyBounds that wraps feature
   */
  public static getGeometryBoundsForFeature(feature: AlloyFeature): AlloyBounds {
    return AlloyBounds.fromMapExtent(feature.olFeature.getGeometry().getExtent());
  }

  /**
   * rotates a coordinate around the anchor
   * @param coordinate the coordinate to rotate
   * @param angleRadians the angle in radians to rotate
   * @param anchor the anchor point to rotate around
   */
  public static rotateCoordinate(
    coordinate: OLCoordinate,
    angleRadians: number,
    anchor: OLCoordinate,
  ): OLCoordinate {
    return GeometryUtils.memoizedRotateCoordinate(
      coordinate,
      angleRadians,
      anchor,
    ).slice() /* slice returns [] notOLCoordinate but we know it is so cast */ as [number, number];
  }

  /**
   * Removes a coordinate from simple geometry
   * @param geometry parent geometry from which to remove coordinate
   * @param coordinate coordinate to remove from geometry
   */
  public static removeCoordinate(geometry: OLGeometry, coordinate: OLCoordinate): boolean {
    switch (geometry.getType()) {
      case OLGeometryType.MULTI_POINT:
        const multiPoint = geometry as OLMultiPoint;
        const multiPointCoordinates = multiPoint.getCoordinates().slice();
        const pointIdx = multiPointCoordinates.findIndex((mpc) =>
          GeometryUtils.isCoordinateEqual(mpc, coordinate),
        );
        let multiPointRemoved = false;
        if (pointIdx > -1) {
          multiPointCoordinates.splice(pointIdx, 1);
          multiPointRemoved = true;
        }
        multiPoint.setCoordinates(multiPointCoordinates);
        return multiPointRemoved;
      case OLGeometryType.LINE_STRING:
        const lineString = geometry as OLLineString;
        const lineStringCoordinates = lineString.getCoordinates().slice();
        const lineIdx = lineStringCoordinates.findIndex((lsc) =>
          GeometryUtils.isCoordinateEqual(lsc, coordinate),
        );
        let lineStringRemoved = false;
        if (lineIdx > -1) {
          lineStringCoordinates.splice(lineIdx, 1);
          lineStringRemoved = true;
        }
        lineString.setCoordinates(lineStringCoordinates);
        return lineStringRemoved;
      case OLGeometryType.MULTI_LINE_STRING:
        const multiLineString = geometry as OLMultiLineString;
        const multiLineStringCoordinates = multiLineString.getCoordinates().slice();
        let multiLineStringRemoved = false;
        for (let i = 0; i < multiLineStringCoordinates.length; i++) {
          const line = multiLineStringCoordinates[i];
          const idx = line.findIndex((lc) => GeometryUtils.isCoordinateEqual(lc, coordinate));
          if (idx > -1) {
            line.splice(idx, 1);
            if (line.length < 2) {
              multiLineStringCoordinates.splice(i, 1);
            }
            multiLineStringRemoved = true;
            break;
          }
        }
        multiLineString.setCoordinates(multiLineStringCoordinates);
        return multiLineStringRemoved;
      case OLGeometryType.POLYGON:
        const polygon = geometry as OLPolygon;
        const polygonCoordinates = polygon.getCoordinates().slice();
        let polygonRemoved = false;
        for (const coords of polygonCoordinates) {
          const idx = coords.findIndex((pc) => GeometryUtils.isCoordinateEqual(pc, coordinate));
          if (idx > -1) {
            coords.splice(idx, 1);
            if (idx === 0) {
              coords.splice(-1, 1, coords[0].slice() as OLCoordinate);
            }
            polygonRemoved = true;
            break;
          }
        }
        polygon.setCoordinates(polygonCoordinates);
        return polygonRemoved;
      case OLGeometryType.MULTI_POLYGON:
        const multiPolygon = geometry as OLMultiPolygon;
        const multiPolygonCoordinates = multiPolygon.getCoordinates().slice();
        let multiPolygonRemoved = false;
        for (let i = 0; i < multiPolygonCoordinates.length; i++) {
          const poly = multiPolygonCoordinates[i];
          let removed = false;
          for (let j = 0; j < poly.length; j++) {
            const coords = poly[j];
            const idx = coords.findIndex((mpc) => GeometryUtils.isCoordinateEqual(mpc, coordinate));
            if (idx > -1) {
              coords.splice(idx, 1);
              if (idx === 0) {
                coords.splice(-1, 1, coords[0].slice() as OLCoordinate);
              }
              if (coords.length < 4) {
                poly.splice(j, 1);
              }
              removed = true;
              break;
            }
          }
          if (poly.length === 0) {
            multiPolygonCoordinates.splice(i, 1);
          }
          if (removed) {
            multiPolygonRemoved = true;
            break;
          }
        }
        multiPolygon.setCoordinates(multiPolygonCoordinates);
        return multiPolygonRemoved;
      case OLGeometryType.GEOMETRY_COLLECTION:
        const geometryCollection = geometry as OLGeometryCollection;
        const subGeometries = geometryCollection.getGeometries();
        let geometryCollectionRemoved = false;
        for (let i = 0; i < subGeometries.length; i++) {
          const subGeometry = subGeometries[i];
          const isRemoved = GeometryUtils.removeCoordinate(subGeometry, coordinate);
          if (isRemoved) {
            if (
              (subGeometry instanceof OLMultiPoint ||
                subGeometry instanceof OLMultiLineString ||
                subGeometry instanceof OLMultiPolygon) &&
              subGeometry.getCoordinates().length === 0
            ) {
              subGeometries.splice(i, 1);
            }
            geometryCollectionRemoved = true;
            break;
          }
        }
        geometryCollection.setGeometries(subGeometries);
        return geometryCollectionRemoved;
      default:
        throw new AlloyMapError(1587399847, `Unhandled geometry type ${geometry.getType()}`);
    }
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
   * checks if two coordinates are "equal"
   * @param first first coordinate
   * @param second second coordinate
   * @return true if coordinates are equals to 6dp
   */
  public static isCoordinateEqual(first: OLCoordinate, second: OLCoordinate): boolean {
    return (
      MathUtils.approximateEquals(first[0], second[0], 0.000001) &&
      MathUtils.approximateEquals(first[1], second[1], 0.000001)
    );
  }

  /**
   * memoized version of `createIconCanvasImplementation`
   * @ignore
   * @internal
   */
  private static readonly memoizedRotateCoordinate = _.memoize(
    GeometryUtils.rotateCoordinateImplementation,
    // custom resolver because lodash only keys on the first argument
    (coordinate: OLCoordinate, angleRadians: number, anchor: OLCoordinate) =>
      coordinate.join(',') + ':' + angleRadians + ':' + anchor.join(','),
  );

  /**
   * memoized version of `roundCoordinate`
   * @ignore
   * @internal
   */
  private static readonly memoizedRoundCoordinate = _.memoize(
    GeometryUtils.roundCoordinate,
    (coordinate: OLCoordinate) => coordinate.join(','),
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
    coordinate: OLCoordinate,
    angleRadians: number,
    anchor: OLCoordinate,
  ): OLCoordinate {
    const p = new OLPoint(coordinate);
    p.rotate(angleRadians, anchor);
    return p.getCoordinates();
  }
}
