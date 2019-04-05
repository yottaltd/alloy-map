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

    // get flattened geometry collection from behind the cache and grab the multi geom we want
    return AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      geometry as OLGeometryCollection,
    ).points;
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

    // get flattened geometry collection from behind the cache and grab the multi geom we want
    return AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      geometry as OLGeometryCollection,
    ).multiPoints;
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

    // get flattened geometry collection from behind the cache and grab the multi geom we want
    return AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      geometry as OLGeometryCollection,
    ).lineStrings;
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

    // get flattened geometry collection from behind the cache and grab the multi geom we want
    return AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      geometry as OLGeometryCollection,
    ).multiLineStrings;
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

    // get flattened geometry collection from behind the cache and grab the multi geom we want
    return AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      geometry as OLGeometryCollection,
    ).polygons;
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

    // get flattened geometry collection from behind the cache and grab the multi geom we want
    return AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      geometry as OLGeometryCollection,
    ).multiPolygons;
  };

  /**
   * cache of the flattened geometry collection data, using a weak map ensures we don't bump the
   * revision counter on the openlayers geometry but we also release memory once nothing references
   * the geometry collection anymore
   */
  private static readonly cache = new WeakMap<OLGeometryCollection, FlattenedGeometryCollection>();

  /**
   * gets or generates the data required to flatten a geometry collection and returns the result
   * @param olGeometry the geometry collection to generate the data for
   */
  private static getAndCacheFlattenedGeometryCollection(
    olGeometry: OLGeometryCollection,
  ): FlattenedGeometryCollection {
    // first check the cache
    let geometries:
      | FlattenedGeometryCollection
      | undefined = AlloyGeometryCollectionFunctions.cache.get(olGeometry);
    if (geometries) {
      // if its in the cache, great! short circuit!
      console.log('got me from cache mate!', olGeometry);
      return geometries;
    }
    console.log('load me hearties!', olGeometry);

    const data: GeomtryCollectionGeometries = {
      points: [],
      multiPoints: [],
      lineStrings: [],
      multiLineStrings: [],
      polygons: [],
      multiPolygons: [],
    };

    // recursively populate the data model
    AlloyGeometryCollectionFunctions.getAllGeometriesRecursively(olGeometry, data);

    // create a geometry for each type
    geometries = {
      points: new OLMultiPoint(data.points.map((p) => p.getCoordinates())),
      multiPoints: new OLMultiPoint(_.flatten(data.multiPoints.map((g) => g.getCoordinates()))),
      lineStrings: new OLMultiLineString(data.lineStrings.map((l) => l.getCoordinates())),
      multiLineStrings: new OLMultiLineString(
        _.flatten(data.multiLineStrings.map((g) => g.getCoordinates())),
      ),
      polygons: new OLMultiPolygon(data.polygons.map((p) => p.getCoordinates())),
      multiPolygons: new OLMultiPolygon(
        _.flatten(data.multiPolygons.map((g) => g.getCoordinates())),
      ),
    };

    // cache and return the results
    AlloyGeometryCollectionFunctions.cache.set(olGeometry, geometries);
    return geometries;
  }

  /**
   * recursively traverses a geometry collection to find all its sub geometry and group them
   * @param olGeometry the geometry collection to traverse
   * @param geometries the geometries payload to populate as it finds children
   */
  private static getAllGeometriesRecursively(
    olGeometry: OLGeometryCollection,
    geometries: GeomtryCollectionGeometries,
  ): void {
    olGeometry.getGeometries().forEach((g) => {
      switch (g.getType()) {
        case 'GeometryCollection':
          // recursively work through the sub geometry collection
          AlloyGeometryCollectionFunctions.getAllGeometriesRecursively(
            g as OLGeometryCollection,
            geometries,
          );
          break;
        case 'Point':
          geometries.points.push(g as OLPoint);
          break;
        case 'MultiPoint':
          geometries.multiPoints.push(g as OLMultiPoint);
          break;
        case 'LineString':
          geometries.lineStrings.push(g as OLLineString);
          break;
        case 'MultiLineString':
          geometries.multiLineStrings.push(g as OLMultiLineString);
          break;
        case 'Polygon':
          geometries.polygons.push(g as OLPolygon);
          break;
        case 'MultiPolygon':
          geometries.multiPolygons.push(g as OLMultiPolygon);
          break;
      }
    });
  }
}

/**
 * data container for traversing a geometry collection to get its sub geometries
 * @ignore
 */
interface GeomtryCollectionGeometries {
  points: OLPoint[];
  multiPoints: OLMultiPoint[];
  lineStrings: OLLineString[];
  multiLineStrings: OLMultiLineString[];
  polygons: OLPolygon[];
  multiPolygons: OLMultiPolygon[];
}

/**
 * a geometry collection flattened into multiple multi geoms (one for each supported type)
 * @ignore
 */
interface FlattenedGeometryCollection {
  /**
   * the multi point representing all points in the geometry collection
   */
  points: OLMultiPoint;

  /**
   * the multi point representing all multi points in the geometry collection
   */
  multiPoints: OLMultiPoint;

  /**
   * the multi line string representing all line strings in the geometry collection
   */
  lineStrings: OLMultiLineString;

  /**
   * the multi line string representing all multi line strings in the geometry collection
   */
  multiLineStrings: OLMultiLineString;

  /**
   * the multi polygon representing all polygons in the geometry collection
   */
  polygons: OLMultiPolygon;

  /**
   * the multi polygon representing all multi polygons in the geometry collection
   */
  multiPolygons: OLMultiPolygon;
}
