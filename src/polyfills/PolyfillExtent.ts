import { intersects } from 'ol/extent.js';

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
}
