/**
 * the maximum resolution to scale to, beyond this we would clamp to a minimum size
 * @ignore
 */
const SCALE_RESOLUTION_MAX = 76;

/**
 * the minimum resolution to scale to, below this we could clamp to the max size
 * @ignore
 */
const SCALE_RESOLUTION_MIN = 4.5;

/**
 * the scale multiplier for items that grow based on resolution within the `SCALE_RESOLUTION_MAX`
 * and `SCALE_RESOLUTION_MIN` ranges
 * @ignore
 */
const SCALE_MULTIPLIER = 0.5 / (SCALE_RESOLUTION_MAX - SCALE_RESOLUTION_MIN);

/**
 * utility for scaling values according to the map
 * @ignore
 * @internal
 */
export abstract class AlloyScaleUtils {
  /**
   * the max radius in pixels for a point
   */
  public static readonly POINT_RADIUS_MAX = 25;

  /**
   * the max width of a line in pixels, this is an odd number because of centering circular elements
   * along the line, having a central point makes these visually align
   */
  public static readonly LINE_WIDTH_MAX = 11;

  /**
   * calculates a value to multiply the size of an element on screen by (if it grows e.g. clusters)
   * in relation to the resolution
   * @param resolution the resolution to calculate the scale multiplier for
   */
  public static getScaleMultiplierForResolution(resolution: number): number {
    if (resolution >= SCALE_RESOLUTION_MIN) {
      if (resolution >= SCALE_RESOLUTION_MAX) {
        return 0.5;
      } else {
        return 0.5 + (SCALE_RESOLUTION_MAX - resolution - SCALE_RESOLUTION_MIN) * SCALE_MULTIPLIER;
      }
    }
    return 1.0;
  }
}
