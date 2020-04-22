/**
 * Options for setting map scale position
 */
export interface AlloyMapScaleOptions {
  /**
   * to which map corner should x/y values be anchored
   */
  anchor: 'TopLeft' | 'TopRight' | 'BottomRight' | 'BottomLeft';
  /**
   * x pixel value for offset from left or right end
   */
  x: number;
  /**
   * y pixel value for offset from top or bottom end
   */
  y: number;
}
