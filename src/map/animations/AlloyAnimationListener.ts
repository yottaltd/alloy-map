import RenderCanvas from 'ol/render/canvas';

/**
 * listener interface for animation lifecycle, allows bespoke drawing for animations
 * @ignore
 * @internal
 */
export interface AlloyAnimationListener {
  /**
   * called pre animation cycle
   */
  preAnimation: () => void;

  /**
   * called during the animation cycle
   * @param renderer the canvas to render to
   * @param ratio a value between 0-1 indicating where in the timeline an animation is 0 start 1 end
   */
  compose: (renderer: RenderCanvas.Immediate, ratio: number) => void;

  /**
   * called post animation cycle
   */
  postAnimation: () => void;
}
