import { Coordinate as OLCoordinate } from 'ol/coordinate';
import {
  boundingExtent,
  buffer,
  containsCoordinate,
  containsExtent,
  Extent as OLExtent,
  intersects,
} from 'ol/extent';

/**
 * wraps the openlayers ol/extent module due to typing issues.
 * see: https://openlayers.org/en/latest/apidoc/module-ol_extent.html
 * @ignore
 * @internal
 */
export abstract class PolyfillExtent {
  /**
   * determine if one extent intersects another
   * @param extent1 the first extent to check
   * @param extent2 the second extent to check
   */
  public static intersects(extent1: OLExtent, extent2: OLExtent): boolean {
    return intersects(extent1, extent2);
  }

  /**
   * determine if one extent contains another
   * @param extent1 the first extent to check
   * @param extent2 the second extent to check
   */
  public static contains(extent1: OLExtent, extent2: OLExtent): boolean {
    return containsExtent(extent1, extent2);
  }

  /**
   * buffers extent by given value
   * @param extent extent to buffer
   * @param value the amount by which the extent should be buffered
   */
  public static buffer(extent: OLExtent, value: number): OLExtent {
    return buffer(extent, value);
  }

  /**
   * determine whether an extent contains coordinate
   * @param extent the extent
   * @param coordinate the coordinate to check whether it's inside of the extent
   * @returns true if coordinate is inside the extent
   */
  public static containsCoordinate(extent: OLExtent, coordinate: OLCoordinate): boolean {
    return containsCoordinate(extent, coordinate);
  }

  /**
   * creates a bounding extent that wraps all of provided coordinates
   * @param coordinates coordinate to calculate extent for
   */
  public static boundingExtent(coordinates: OLCoordinate[]): OLExtent {
    return boundingExtent(coordinates);
  }
}
