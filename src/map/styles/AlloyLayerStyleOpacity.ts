/**
 * Wrapper for style opacity that limits opacity to 0-1 range
 * @ignore
 * @internal
 */
export class AlloyLayerStyleOpacity {
  /**
   * Default Opaque opacity with value 1
   */
  public static readonly Opaque: AlloyLayerStyleOpacity = new AlloyLayerStyleOpacity(1);

  /**
   * Clamped opacity value
   */
  public readonly value: number;

  /**
   * Clamps opacity value between 0 and 1
   * @param opacity opacity value, defaults to 1
   */
  constructor(opacity?: number) {
    this.value = opacity !== undefined ? Math.min(Math.max(0, opacity), 1) : 1;
  }
}
