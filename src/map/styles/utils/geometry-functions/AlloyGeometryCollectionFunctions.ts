import { AlloyMapError } from '@/error/AlloyMapError';
import * as _ from 'lodash';
import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLGeometryType from 'ol/geom/GeometryType';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import OLRenderFeature from 'ol/render/Feature';

/**
 * geometry functions for openlayers styles, this allows us to work with multigeom instances
 * @ignore
 * @internal
 */
export abstract class AlloyGeometryCollectionFunctions {
  /**
   * converts a feature of geometry collection to its individual points.
   * **this is cached per geometry**
   */
  public static convertFeaturePointsToMultiPoint(
    olFeature: OLFeature | OLRenderFeature,
  ): OLMultiPoint {
    return AlloyGeometryCollectionFunctions.convertGeometryPointsToMultiPoint(
      olFeature.getGeometry(),
    );
  }

  /**
   * converts a geometry collection to its individual points. **this is cached per geometry**
   */
  public static convertGeometryPointsToMultiPoint(
    olGeometry: OLGeometry | OLRenderFeature,
  ): OLMultiPoint {
    // MUST be a geometry collection, otherwise why are we running this?
    if (olGeometry.getType() !== OLGeometryType.GEOMETRY_COLLECTION) {
      throw new AlloyMapError(
        1554478091,
        'cannot run geometry function for non-geometry collection',
      );
    }

    // get flattened geometry collection from behind the cache and grab the multi geom we want
    return AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      olGeometry as OLGeometryCollection,
    ).points;
  }

  /**
   * converts a feature of geometry collection to its individual multi points.
   * **this is cached per geometry**
   */
  public static convertFeatureMultiPointsToMultiPoint(
    olFeature: OLFeature | OLRenderFeature,
  ): OLMultiPoint {
    return AlloyGeometryCollectionFunctions.convertGeometryMultiPointsToMultiPoint(
      olFeature.getGeometry(),
    );
  }

  /**
   * converts a geometry collection to its individual multi points. **this is cached per geometry**
   */
  public static convertGeometryMultiPointsToMultiPoint(
    olGeometry: OLGeometry | OLRenderFeature,
  ): OLMultiPoint {
    // MUST be a geometry collection, otherwise why are we running this?
    if (olGeometry.getType() !== OLGeometryType.GEOMETRY_COLLECTION) {
      throw new AlloyMapError(
        1554479460,
        'cannot run geometry function for non-geometry collection',
      );
    }

    // get flattened geometry collection from behind the cache and grab the multi geom we want
    return AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      olGeometry as OLGeometryCollection,
    ).multiPoints;
  }

  /**
   * converts a feature of geometry collection to its individual line strings.
   * **this is cached per geometry**
   */
  public static convertFeatureLineStringsToMultiLineString(
    olFeature: OLFeature | OLRenderFeature,
  ): OLMultiLineString {
    return AlloyGeometryCollectionFunctions.convertGeometryLineStringsToMultiLineString(
      olFeature.getGeometry(),
    );
  }

  /**
   * converts a geometry collection to its individual line strings. **this is cached per geometry**
   */
  public static convertGeometryLineStringsToMultiLineString(
    olGeometry: OLGeometry | OLRenderFeature,
  ): OLMultiLineString {
    // MUST be a geometry collection, otherwise why are we running this?
    if (olGeometry.getType() !== OLGeometryType.GEOMETRY_COLLECTION) {
      throw new AlloyMapError(
        1554479613,
        'cannot run geometry function for non-geometry collection',
      );
    }

    // get flattened geometry collection from behind the cache and grab the multi geom we want
    return AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      olGeometry as OLGeometryCollection,
    ).lineStrings;
  }

  /**
   * converts a feature of geometry collection to its individual multi line strings.
   * **this is cached per geometry**
   */
  public static convertFeatureMultiLineStringsToMultiLineString(
    olFeature: OLFeature | OLRenderFeature,
  ): OLMultiLineString {
    return AlloyGeometryCollectionFunctions.convertGeometryMultiLineStringsToMultiLineString(
      olFeature.getGeometry(),
    );
  }

  /**
   * converts a geometry collection to its individual multi line strings.
   * **this is cached per geometry**
   */
  public static convertGeometryMultiLineStringsToMultiLineString(
    olGeometry: OLGeometry | OLRenderFeature,
  ): OLMultiLineString {
    // MUST be a geometry collection, otherwise why are we running this?
    if (olGeometry.getType() !== OLGeometryType.GEOMETRY_COLLECTION) {
      throw new AlloyMapError(
        1554479698,
        'cannot run geometry function for non-geometry collection',
      );
    }

    // get flattened geometry collection from behind the cache and grab the multi geom we want
    return AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      olGeometry as OLGeometryCollection,
    ).multiLineStrings;
  }

  /**
   * converts a feature of geometry collection to its individual polygons.
   * **this is cached per geometry**
   */
  public static convertFeaturePolygonsToMultiPolygon(
    olFeature: OLFeature | OLRenderFeature,
  ): OLMultiPolygon {
    return AlloyGeometryCollectionFunctions.convertGeometryPolygonsToMultiPolygon(
      olFeature.getGeometry(),
    );
  }

  /**
   * converts a geometry collection to its individual polygons. **this is cached per geometry**
   */
  public static convertGeometryPolygonsToMultiPolygon(
    olGeometry: OLGeometry | OLRenderFeature,
  ): OLMultiPolygon {
    // MUST be a geometry collection, otherwise why are we running this?
    if (olGeometry.getType() !== OLGeometryType.GEOMETRY_COLLECTION) {
      throw new AlloyMapError(
        1554479633,
        'cannot run geometry function for non-geometry collection',
      );
    }

    // get flattened geometry collection from behind the cache and grab the multi geom we want
    return AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      olGeometry as OLGeometryCollection,
    ).polygons;
  }

  /**
   * converts a feature of geometry collection to its individual multi polygons.
   * **this is cached per geometry**
   */
  public static convertFeatureMultiPolygonsToMultiPolygon(
    olFeature: OLFeature | OLRenderFeature,
  ): OLMultiPolygon {
    return AlloyGeometryCollectionFunctions.convertGeometryMultiPolygonsToMultiPolygon(
      olFeature.getGeometry(),
    );
  }

  /**
   * converts a geometry collection to its individual multi polygons.
   * **this is cached per geometry**
   */
  public static convertGeometryMultiPolygonsToMultiPolygon(
    olGeometry: OLGeometry | OLRenderFeature,
  ): OLMultiPolygon {
    // MUST be a geometry collection, otherwise why are we running this?
    if (olGeometry.getType() !== OLGeometryType.GEOMETRY_COLLECTION) {
      throw new AlloyMapError(
        1554479729,
        'cannot run geometry function for non-geometry collection',
      );
    }

    // get flattened geometry collection from behind the cache and grab the multi geom we want
    return AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      olGeometry as OLGeometryCollection,
    ).multiPolygons;
  }

  /**
   * calculates the largest polygon inside a geometry collection, searches both polygons and multi
   * polygons to find the largest sub geometry **this is cached per geometry**
   * @param olGeometry the geometry collection to find the largest polygon for
   */
  public static calculateLargestPolygon(olGeometry: OLGeometryCollection): OLPolygon | null {
    // first check the cache
    let largestPolygon:
      | OLPolygon
      | undefined
      | null = AlloyGeometryCollectionFunctions.largestPolygonCache.get(olGeometry);
    if (largestPolygon) {
      return largestPolygon;
    }

    // get the cached flattened geometries
    const geometries = AlloyGeometryCollectionFunctions.getAndCacheFlattenedGeometryCollection(
      olGeometry as OLGeometryCollection,
    );
    const polygons = geometries.polygons
      .getPolygons()
      .concat(geometries.multiPolygons.getPolygons());

    // short circuit for special cases
    if (!polygons || polygons.length === 0) {
      largestPolygon = null;
    } else if (polygons.length === 1) {
      largestPolygon = polygons[0];
    } else {
      // otherwise work out the area for each sub geometry and select the largest
      largestPolygon = polygons
        .map((p) => ({
          polygon: p,
          area: p.getArea(),
        }))
        .sort((a, b) => b.area - a.area)[0].polygon;
    }

    // cache the result
    AlloyGeometryCollectionFunctions.largestPolygonCache.set(olGeometry, largestPolygon);
    return largestPolygon;
  }

  /**
   * cache of the flattened geometry collection data, using a weak map ensures we don't bump the
   * revision counter on the openlayers geometry but we also release memory once nothing references
   * the geometry collection anymore
   */
  private static readonly flattenedGeometryCollectionCache = new WeakMap<
    OLGeometryCollection,
    FlattenedGeometryCollection
  >();

  /**
   * cache of the largest polygon for a geom collection, using a weak map ensures we don't bump the
   * revision counter on the openlayers geometry but we also release memory once nothing references
   * the geometry collection anymore
   */
  private static readonly largestPolygonCache = new WeakMap<
    OLGeometryCollection,
    OLPolygon | null
  >();

  /**
   * gets or generates the data required to flatten a geometry collection and returns the result
   * @param olGeometry the geometry collection to generate the data for
   */
  private static getAndCacheFlattenedGeometryCollection(
    olGeometry: OLGeometryCollection,
  ): FlattenedGeometryCollection {
    // first check the cache
    let geometries = AlloyGeometryCollectionFunctions.flattenedGeometryCollectionCache.get(
      olGeometry,
    );
    if (geometries) {
      // if its in the cache, great! short circuit!
      return geometries;
    }

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
    AlloyGeometryCollectionFunctions.flattenedGeometryCollectionCache.set(olGeometry, geometries);
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
        case OLGeometryType.GEOMETRY_COLLECTION:
          // recursively work through the sub geometry collection
          AlloyGeometryCollectionFunctions.getAllGeometriesRecursively(
            g as OLGeometryCollection,
            geometries,
          );
          break;
        case OLGeometryType.POINT:
          geometries.points.push(g as OLPoint);
          break;
        case OLGeometryType.MULTI_POINT:
          geometries.multiPoints.push(g as OLMultiPoint);
          break;
        case OLGeometryType.LINE_STRING:
          geometries.lineStrings.push(g as OLLineString);
          break;
        case OLGeometryType.MULTI_LINE_STRING:
          geometries.multiLineStrings.push(g as OLMultiLineString);
          break;
        case OLGeometryType.POLYGON:
          geometries.polygons.push(g as OLPolygon);
          break;
        case OLGeometryType.MULTI_POLYGON:
          geometries.multiPolygons.push(g as OLMultiPolygon);
          break;
      }
    });
  }
}

/**
 * data container for traversing a geometry collection to get its sub geometries
 * @ignore
 * @internal
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
 * @internal
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
