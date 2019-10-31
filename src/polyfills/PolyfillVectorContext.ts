import { getVectorContext } from 'ol/render';
import OLCanvasImmediateRenderer from 'ol/render/canvas/Immediate';
import OLRenderEvent from 'ol/render/Event';

/**
 * wraps the openlayers ol/render/getVectorContext function due to typing issues.
 * see: https://openlayers.org/en/latest/apidoc/module-ol_render.html
 * @ignore
 * @internal
 */
export abstract class PolyfillVectorContext {
  /**
   * Gets vector context for current render event
   * @param event ol render event
   */
  public static get(event: OLRenderEvent): OLCanvasImmediateRenderer {
    return getVectorContext(event);
  }
}
