import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLRenderFeature from 'ol/render/Feature';
import { AlloyMapError } from '../../../../error/AlloyMapError';
import * as _ from 'lodash';

/**
 * geometry functions for openlayers styles, modifies multi linestring geometry for styling
 * @ignore
 */
export abstract class AlloyMultiLineStringFunctions {
  /**
   * converts a feature of multi line string to its central point along the line.
   * **this is cached per geometry**
   */
  public static convertFeatureToMidPoints(olFeature: OLFeature | OLRenderFeature): OLMultiPoint {
    return AlloyMultiLineStringFunctions.convertGeometryToMidPoints(olFeature.getGeometry());
  }

  /**
   * converts a multi line string to its central point along the line.
   * **this is cached per geometry**
   */
  public static convertGeometryToMidPoints(olGeometry: OLGeometry | OLRenderFeature): OLMultiPoint {
    // MUST be a multi linestring, otherwise why are we running this?
    if (olGeometry.getType() !== 'MultiLineString') {
      throw new AlloyMapError(1554552431, 'cannot run geometry function for non-multi linestring');
    }

    // get mid point from behind the cache
    return AlloyMultiLineStringFunctions.getAndCacheMultiLineStringMidPoints(
      olGeometry as OLMultiLineString,
    );
  }

  /**
   * converts a multi line string to its first and last points.
   */
  public static convertFeatureToEndPoints(olFeature: OLFeature | OLRenderFeature): OLMultiPoint {
    return AlloyMultiLineStringFunctions.convertGeometryToEndPoints(olFeature.getGeometry());
  }

  /**
   * converts a multi line string to its first and last points.
   */
  public static convertGeometryToEndPoints(olGeometry: OLGeometry | OLRenderFeature): OLMultiPoint {
    // MUST be a multilinestring, otherwise why are we running this?
    if (olGeometry.getType() !== 'MultiLineString') {
      throw new AlloyMapError(1555066382, 'cannot run geometry function for non-multilinestring');
    }

    // get mid point from behind the cache
    return new OLMultiPoint(
      _.flatten(
        (olGeometry as OLMultiLineString)
          .getLineStrings()
          .map((l) => [l.getFirstCoordinate(), l.getLastCoordinate()]),
      ),
    );
  }

  /**
   * cache of the mid point data for multi linestrings, using a weak map ensures we don't bump the
   * revision counter on the openlayers geometry but we also release memory once nothing references
   * the linestring anymore
   */
  private static readonly cache = new WeakMap<OLMultiLineString, OLMultiPoint>();

  /**
   * gets or generates the multi linestring mid points and returns the result
   * @param olGeometry the linestring to calculate the mid point for
   */
  private static getAndCacheMultiLineStringMidPoints(olGeometry: OLMultiLineString): OLMultiPoint {
    // first check the cache
    let multiPoint: OLMultiPoint | undefined = AlloyMultiLineStringFunctions.cache.get(olGeometry);
    if (multiPoint) {
      // if its in the cache, great! short circuit!
      return multiPoint;
    }

    // calculate the mid points
    multiPoint = new OLMultiPoint(olGeometry.getLineStrings().map((l) => l.getCoordinateAt(0.5)));

    // cache and return the results
    AlloyMultiLineStringFunctions.cache.set(olGeometry, multiPoint);
    return multiPoint;
  }
}
