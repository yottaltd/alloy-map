import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPolygon from 'ol/geom/Polygon';

/**
 * geometry functions for openlayers styles, modifies multi polygon geometry for styling
 * @ignore
 * @internal
 */
export abstract class AlloyMultiPolygonFunctions {
  /**
   * calculates the largest polygon inside a multi polygon **this is cached per geometry**
   * @param olGeometry the multi polygon to find the largest polygon for
   */
  public static calculateLargestPolygon(olGeometry: OLMultiPolygon): OLPolygon | null {
    // first check the cache
    let largestPolygon:
      | OLPolygon
      | undefined
      | null = AlloyMultiPolygonFunctions.largestPolygonCache.get(olGeometry);
    if (largestPolygon) {
      return largestPolygon;
    }

    const polygons = olGeometry.getPolygons();

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
        .sort((a, b) => a.area - b.area)[0].polygon;
    }

    // cache the result
    AlloyMultiPolygonFunctions.largestPolygonCache.set(olGeometry, largestPolygon);
    return largestPolygon;
  }

  /**
   * cache of the largest polygon for a multi polygon, using a weak map ensures we don't bump the
   * revision counter on the openlayers geometry but we also release memory once nothing references
   * the multi polygon anymore
   */
  private static readonly largestPolygonCache = new WeakMap<OLMultiPolygon, OLPolygon | null>();
}
