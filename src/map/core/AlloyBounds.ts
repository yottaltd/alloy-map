import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
import { PolyfillExtent } from '@/polyfills/PolyfillExtent';
import { Extent as OLExtent } from 'ol/extent';

/**
 * an alloy bounds represents a bounding box on the map using south west and north east corner
 * coordinates respectively. coordinates are normalised to always represent longitude and latitude
 */
export class AlloyBounds {
  /**
   * converts a map extent to an alloy bounds instance
   * @param extent the extent from the map assumed to be in `[swX,swY,neX,neY]` and
   *               [EPSG:3857](https://epsg.io/3857) projection
   * @ignore
   * @internal
   */
  public static fromMapExtent(extent: OLExtent): AlloyBounds {
    return new AlloyBounds(
      AlloyCoordinate.fromMapCoordinate([extent[0], extent[1]]),
      AlloyCoordinate.fromMapCoordinate([extent[2], extent[3]]),
    );
  }

  /**
   * the south west coordinate
   */
  public sw: AlloyCoordinate;

  /**
   * the north east coordinate
   */
  public ne: AlloyCoordinate;

  /**
   * creates a new instance
   * @param sw the south west coordinate
   * @param ne the north east coordinate
   */
  constructor(sw: AlloyCoordinate, ne: AlloyCoordinate) {
    this.sw = sw;
    this.ne = ne;
  }

  /**
   * creates an extent to be used on the map, this function will convert the values into
   * [EPSG:3857](https://epsg.io/3857)
   * @ignore
   * @internal
   */
  public toMapExtent(): OLExtent {
    const swMapCoordinate = this.sw.toMapCoordinate();
    const neMapCoordinate = this.ne.toMapCoordinate();
    return [swMapCoordinate[0], swMapCoordinate[1], neMapCoordinate[0], neMapCoordinate[1]];
  }

  /**
   * gets the centroid of the bounding box
   */
  public getCentre(): AlloyCoordinate {
    const minLon = Math.min(this.ne.lon, this.sw.lon);
    const maxLon = Math.max(this.ne.lon, this.sw.lon);
    const minLat = Math.min(this.ne.lat, this.sw.lat);
    const maxLat = Math.max(this.ne.lat, this.sw.lat);
    return new AlloyCoordinate(minLon + (maxLon - minLon) / 2, minLat + (maxLat - minLat) / 2);
  }

  /**
   * Checks if this bounds intersect provided bounds
   * @param bounds the bounds to check against
   * @returns true if bounds intersect
   */
  public intersects(bounds: AlloyBounds): boolean {
    const boundsExtent = bounds.toMapExtent();
    const viewportExtent = this.toMapExtent();
    return (
      PolyfillExtent.intersects(boundsExtent, viewportExtent) ||
      PolyfillExtent.contains(boundsExtent, viewportExtent) ||
      PolyfillExtent.contains(viewportExtent, boundsExtent)
    );
  }
}
