import { intersects, containsExtent, containsCoordinate } from 'ol/extent.js';

/**
 * wraps the openlayers ol/extent module due to typing issues.
 * see: https://openlayers.org/en/latest/apidoc/module-ol_extent.html
 * @ignore
 */
export abstract class PolyfillExtent {
  /**
   * determine if one extent intersects another
   * @param extent1 the first extent to check
   * @param extent2 the second extent to check
   */
  public static intersects(
    extent1: [number, number, number, number],
    extent2: [number, number, number, number],
  ): boolean {
    return intersects(extent1, extent2);
  }

  /**
   * determine if one extent contains another
   * @param extent1 the first extent to check
   * @param extent2 the second extent to check
   */
  public static contains(
    extent1: [number, number, number, number],
    extent2: [number, number, number, number],
  ): boolean {
    return containsExtent(extent1, extent2);
  }

  /**
   * determine whether an extent contains coordinate
   * @param extent the extent
   * @param coordinate the coordinate to check whether it's inside of the extent
   * @returns true if coordinate is inside the extent
   */
  public static containsCoordinate(
    extent: [number, number, number, number],
    coordinate: [number, number],
  ) {
    return containsCoordinate(extent, coordinate);
  }
}
