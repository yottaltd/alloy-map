import * as _ from 'lodash';
import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import OLRenderFeature from 'ol/render/Feature';
import { AlloyMapError } from '../../../error/AlloyMapError';

/**
 * geometry functions for openlayers styles, this allows us to work with multigeom instances
 * @ignore
 */
export abstract class AlloyGeometryCollectionFunctions {
  /**
   * TODO
   * these functions should be cached!
   * they are intensive on each render to unwind geometry collections!
   */

  /**
   * converts a geometry collection to its individual points
   */
  public static readonly TO_POINT_FUNCTION: (
    olFeature: OLFeature | OLRenderFeature,
  ) => OLGeometry = (olFeature) => {
    const geometry = olFeature.getGeometry();

    // MUST be a geometry collection, otherwise why are we running this?
    if (geometry.getType() !== 'GeometryCollection') {
      throw new AlloyMapError(
        1554478091,
        'cannot run geometry function for non-geometry collection',
      );
    }

    // recursively get all the geometries
    const geometries: OLPoint[] = [];
    AlloyGeometryCollectionFunctions.getAllGeometriesRecursively<OLPoint>(
      geometry as OLGeometryCollection,
      'Point',
      geometries,
    );

    // create a single multi point of all points
    return new OLMultiPoint(geometries.map((g) => g.getCoordinates()));
  };

  /**
   * converts a geometry collection to its individual multi points
   */
  public static readonly TO_MULTI_POINT_FUNCTION: (
    olFeature: OLFeature | OLRenderFeature,
  ) => OLGeometry = (olFeature) => {
    const geometry = olFeature.getGeometry();

    // MUST be a geometry collection, otherwise why are we running this?
    if (geometry.getType() !== 'GeometryCollection') {
      throw new AlloyMapError(
        1554479460,
        'cannot run geometry function for non-geometry collection',
      );
    }

    // recursively get all the geometries
    const geometries: OLMultiPoint[] = [];
    AlloyGeometryCollectionFunctions.getAllGeometriesRecursively<OLMultiPoint>(
      geometry as OLGeometryCollection,
      'MultiPoint',
      geometries,
    );

    // create a single multi point of all multi points
    return new OLMultiPoint(_.flatten(geometries.map((g) => g.getCoordinates())));
  };

  /**
   * converts a geometry collection to its individual line strings
   */
  public static readonly TO_LINESTRING_FUNCTION: (
    olFeature: OLFeature | OLRenderFeature,
  ) => OLGeometry = (olFeature) => {
    const geometry = olFeature.getGeometry();

    // MUST be a geometry collection, otherwise why are we running this?
    if (geometry.getType() !== 'GeometryCollection') {
      throw new AlloyMapError(
        1554479613,
        'cannot run geometry function for non-geometry collection',
      );
    }

    // recursively get all the geometries
    const geometries: OLLineString[] = [];
    AlloyGeometryCollectionFunctions.getAllGeometriesRecursively<OLLineString>(
      geometry as OLGeometryCollection,
      'LineString',
      geometries,
    );

    // create a single multi point of all points
    return new OLMultiLineString(geometries.map((g) => g.getCoordinates()));
  };

  /**
   * converts a geometry collection to its individual multi line strings
   */
  public static readonly TO_MULTI_LINESTRING_FUNCTION: (
    olFeature: OLFeature | OLRenderFeature,
  ) => OLGeometry = (olFeature) => {
    const geometry = olFeature.getGeometry();

    // MUST be a geometry collection, otherwise why are we running this?
    if (geometry.getType() !== 'GeometryCollection') {
      throw new AlloyMapError(
        1554479698,
        'cannot run geometry function for non-geometry collection',
      );
    }

    // recursively get all the geometries
    const geometries: OLMultiLineString[] = [];
    AlloyGeometryCollectionFunctions.getAllGeometriesRecursively<OLMultiLineString>(
      geometry as OLGeometryCollection,
      'MultiLineString',
      geometries,
    );

    // create a single multi point of all multi points
    return new OLMultiLineString(_.flatten(geometries.map((g) => g.getCoordinates())));
  };

  /**
   * converts a geometry collection to its individual polygons
   */
  public static readonly TO_POLYGON_FUNCTION: (
    olFeature: OLFeature | OLRenderFeature,
  ) => OLGeometry = (olFeature) => {
    const geometry = olFeature.getGeometry();

    // MUST be a geometry collection, otherwise why are we running this?
    if (geometry.getType() !== 'GeometryCollection') {
      throw new AlloyMapError(
        1554479633,
        'cannot run geometry function for non-geometry collection',
      );
    }

    // recursively get all the geometries
    const geometries: OLPolygon[] = [];
    AlloyGeometryCollectionFunctions.getAllGeometriesRecursively<OLPolygon>(
      geometry as OLGeometryCollection,
      'Polygon',
      geometries,
    );

    // create a single multi point of all points
    return new OLMultiPolygon(geometries.map((g) => g.getCoordinates()));
  };

  /**
   * converts a geometry collection to its individual multi polygons
   */
  public static readonly TO_MULTI_POLYGON_FUNCTION: (
    olFeature: OLFeature | OLRenderFeature,
  ) => OLGeometry = (olFeature) => {
    const geometry = olFeature.getGeometry();

    // MUST be a geometry collection, otherwise why are we running this?
    if (geometry.getType() !== 'GeometryCollection') {
      throw new AlloyMapError(
        1554479729,
        'cannot run geometry function for non-geometry collection',
      );
    }

    // recursively get all the geometries
    const geometries: OLMultiPolygon[] = [];
    AlloyGeometryCollectionFunctions.getAllGeometriesRecursively<OLMultiPolygon>(
      geometry as OLGeometryCollection,
      'MultiPolygon',
      geometries,
    );

    // create a single multi point of all multi points
    return new OLMultiPolygon(_.flatten(geometries.map((g) => g.getCoordinates())));
  };

  /**
   * gets all the geometries of a certain type recursively from a geometry collection
   * @param olGeometry the geometry collection to recurse through
   * @param geometryType the type of geometry to look for
   * @param appendToArray the array to append results to
   */
  private static getAllGeometriesRecursively<T extends OLGeometry>(
    olGeometry: OLGeometryCollection,
    geometryType: string,
    appendToArray: T[],
  ) {
    olGeometry.getGeometries().forEach((g) => {
      switch (g.getType()) {
        case 'GeometryCollection':
          AlloyGeometryCollectionFunctions.getAllGeometriesRecursively(
            g as OLGeometryCollection,
            geometryType,
            appendToArray,
          );
          break;
        case geometryType:
          appendToArray.push(g as T);
          break;
      }
    });
  }
}
