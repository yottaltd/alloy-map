import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import OLMap from 'ol/Map';
import OLRenderFeature from 'ol/render/Feature';
import { AlloyMapError } from '../../../../error/AlloyMapError';

/**
 * geometry functions for openlayers styles, modifies polygon geometry for styling
 * @ignore
 */
export abstract class AlloyPolygonFunctions {
  /**
   * converts a feature of polygon to its central point visually. **this is cached per geometry**
   */
  public static convertFeatureToMidPoint(olFeature: OLFeature | OLRenderFeature): OLPoint {
    return AlloyPolygonFunctions.convertGeometryToMidPoint(olFeature.getGeometry());
  }

  /**
   * converts a polygon to its central point visually. **this is cached per geometry**
   */
  public static convertGeometryToMidPoint(olGeometry: OLGeometry | OLRenderFeature): OLPoint {
    // MUST be a polygon, otherwise why are we running this?
    if (olGeometry.getType() !== 'Polygon') {
      throw new AlloyMapError(1554558865, 'cannot run geometry function for non-polygon');
    }

    // get mid point from behind the cache
    return AlloyPolygonFunctions.getAndCachePolygonMidPoint(olGeometry as OLPolygon);
  }

  /**
   * calculates the size of the mid point required to fill the polygons visual space. the result
   * is returned in pixels and should fit the polygon exactly.
   * **this is cached per geometry and resolution**
   * @param olGeometry the geometry to calculate the mid point size of
   * @param resolution the current resolution
   * @param olMap the map instance used to calculate pixel coordinates from geometry coordinates
   */
  public static calculateMidPointSize(
    olGeometry: OLPolygon,
    resolution: number,
    olMap: OLMap,
  ): number {
    // first check the cache
    let resolutionsToSizes = AlloyPolygonFunctions.midPointSizeCache.get(olGeometry);
    let size: number | undefined;
    if (resolutionsToSizes) {
      size = resolutionsToSizes.get(resolution);
      if (size !== undefined) {
        return size;
      }
    }

    // get the mid point, this is cached
    const midPoint = AlloyPolygonFunctions.convertGeometryToMidPoint(olGeometry);
    const centrePoint = midPoint.getCoordinates();
    const closestPoint = olGeometry.getLinearRing(0).getClosestPoint(centrePoint);

    // distance between two points sqrt(a^2 + b^2)
    const radius = Math.sqrt(
      Math.pow(centrePoint[0] - closestPoint[0], 2) + Math.pow(centrePoint[1] - closestPoint[1], 2),
    );

    // check the map is in the right resolution
    if (olMap.getView().getResolution() !== resolution) {
      throw new AlloyMapError(1554565209, 'the map is not at the same resolution as requested');
    }

    const top = olMap.getPixelFromCoordinate([centrePoint[0], centrePoint[1] - radius]);
    const bottom = olMap.getPixelFromCoordinate([centrePoint[0], centrePoint[1] + radius]);
    size = top[1] - bottom[1]; // distance in pixels

    // cache the result
    if (!resolutionsToSizes) {
      resolutionsToSizes = new Map<number, number>();
      AlloyPolygonFunctions.midPointSizeCache.set(olGeometry, resolutionsToSizes);
    }
    resolutionsToSizes.set(resolution, size);
    return size;
  }

  /**
   * cache of the mid point size for polygons, using a weak map ensures we don't bump the
   * revision counter on the openlayers geometry but we also release memory once nothing references
   * the polygon anymore. the map values are a map of resolution -> size
   */
  private static readonly midPointSizeCache = new WeakMap<OLPolygon, Map<number, number>>();

  /**
   * cache of the mid point data for polygons, using a weak map ensures we don't bump the
   * revision counter on the openlayers geometry but we also release memory once nothing references
   * the polygon anymore
   */
  private static readonly midPointCache = new WeakMap<OLPolygon, OLPoint>();

  /**
   * gets or generates the polygon mid point and returns the result
   * @param olGeometry the polygon to calculate the mid point for
   */
  private static getAndCachePolygonMidPoint(olGeometry: OLPolygon): OLPoint {
    // first check the cache
    let point: OLPoint | undefined = AlloyPolygonFunctions.midPointCache.get(olGeometry);
    if (point) {
      // if its in the cache, great! short circuit!
      return point;
    }

    // calculate the mid point
    point = new OLPoint(olGeometry.getInteriorPoint().getCoordinates());

    // cache and return the results
    AlloyPolygonFunctions.midPointCache.set(olGeometry, point);
    return point;
  }
}
