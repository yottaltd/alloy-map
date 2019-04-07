import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLLineString from 'ol/geom/LineString';
import OLPoint from 'ol/geom/Point';
import OLRenderFeature from 'ol/render/Feature';
import { AlloyMapError } from '../../../../error/AlloyMapError';

/**
 * geometry functions for openlayers styles, modifies linestring geometry for styling
 * @ignore
 */
export abstract class AlloyLineStringFunctions {
  /**
   * converts a line string to its central point along the line. **this is cached per geometry**
   */
  public static convertFeatureToMidPoint(olFeature: OLFeature | OLRenderFeature): OLPoint {
    return AlloyLineStringFunctions.convertGeometryToMidPoint(olFeature.getGeometry());
  }

  /**
   * converts a line string to its central point along the line. **this is cached per geometry**
   */
  public static convertGeometryToMidPoint(olGeometry: OLGeometry | OLRenderFeature): OLPoint {
    // MUST be a linestring, otherwise why are we running this?
    if (olGeometry.getType() !== 'LineString') {
      throw new AlloyMapError(1554551842, 'cannot run geometry function for non-linestring');
    }

    // get mid point from behind the cache
    return AlloyLineStringFunctions.getAndCacheLineStringMidPoint(olGeometry as OLLineString);
  }

  /**
   * cache of the mid point data for linestrings, using a weak map ensures we don't bump the
   * revision counter on the openlayers geometry but we also release memory once nothing references
   * the linestring anymore
   */
  private static readonly cache = new WeakMap<OLLineString, OLPoint>();

  /**
   * gets or generates the linestring mid point and returns the result
   * @param olGeometry the linestring to calculate the mid point for
   */
  private static getAndCacheLineStringMidPoint(olGeometry: OLLineString): OLPoint {
    // first check the cache
    let point: OLPoint | undefined = AlloyLineStringFunctions.cache.get(olGeometry);
    if (point) {
      // if its in the cache, great! short circuit!
      return point;
    }

    // calculate the mid point
    point = new OLPoint(olGeometry.getCoordinateAt(0.5));

    // cache and return the results
    AlloyLineStringFunctions.cache.set(olGeometry, point);
    return point;
  }
}
