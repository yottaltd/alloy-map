import OLPoint from 'ol/geom/Point';
import OLMapBrowserPointerEvent from 'ol/MapBrowserPointerEvent';
import OLCanvasImmediateRenderer from 'ol/render/canvas/Immediate';
import OLRenderEvent from 'ol/render/Event';
import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStyle from 'ol/style/Style';
import { PolyfillObservable } from '../../polyfills/PolyfillObservable';
import { PolyfillVectorContext } from '../../polyfills/PolyfillVectorContext';
import { AlloyMap } from '../core/AlloyMap';

/**
 * the animation length in milliseconds
 * @ignore
 */
const PING_ANIMATION_LENGTH = 500;

/**
 * the max radius for the ping animation in pixels
 * @ignore
 */
const PING_ANIMATION_MAX_RADIUS = 25;

/**
 * adds a nice click animation to the map
 * @ignore
 * @internal
 */
export class AlloyPingInteraction {
  /**
   * the map to add selection interaction to
   */
  private map: AlloyMap;

  /**
   * creates a new instance
   * @param map the map to add selection interaction to
   * @ignore
   * @internal
   */
  constructor(map: AlloyMap) {
    this.map = map;

    // listen for click events
    this.map.olMap.on('click', (e) => {
      this.onClick(e as OLMapBrowserPointerEvent /* this is untyped in ol */);
    });
  }

  /**
   * called when the click event is triggered
   * @param event the click event
   */
  private onClick(event: OLMapBrowserPointerEvent): void {
    // short circuit when dragging
    if (event.dragging) {
      return;
    }

    // start the ping animation
    this.ping(new OLPoint(event.coordinate));
  }

  /**
   * starts a standard ping animation
   * @param olPoint the point of origin
   */
  private ping(olPoint: OLPoint) {
    const basemap = this.map.basemap;
    if (!basemap) {
      return;
    }

    const start = new Date().getTime();

    const animate = (e: OLRenderEvent) => {
      // WARNING! There be demons ahead! if we change renderers e.g. webgl then this will fail
      const immediate: OLCanvasImmediateRenderer = PolyfillVectorContext.getVectorContext(e);
      const elapsed = e.frameState.time - start;
      const elapsedRatio = elapsed / PING_ANIMATION_LENGTH; // between 0-1

      // ease out (t * (2 - t))
      const radius = easeOut(elapsedRatio) * PING_ANIMATION_MAX_RADIUS;
      const opacity = easeOut(1 - elapsedRatio) * 0.5;

      if (radius < 0) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        PolyfillObservable.unByKey(listener);
        return;
      }

      const style = new OLStyle({
        image: new OLCircle({
          radius,
          fill: new OLFill({
            color: `rgba(255, 255, 255, ${opacity})`,
          }),
        }),
      });

      immediate.setStyle(style);
      immediate.drawGeometry(olPoint);

      // remove the event listener when done
      if (elapsed > PING_ANIMATION_LENGTH) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        PolyfillObservable.unByKey(listener);
        return;
      }

      // tell openlayers to continue postrender
      this.map.olMap.render();
    };

    // setup the animation listener on postrender and keep a reference so we can clean it up
    const listener = basemap.layer.on('postrender', (e) => {
      // needs to be called inside fat arrow function to retain "this"
      animate(e as OLRenderEvent);
    });

    // tell open layers to request rendering, without this the map freezes!
    this.map.olMap.render();
  }
}

/**
 * calculates the ease out scaling value
 * @param timing the current position in the animations timing between 0-1
 */
function easeOut(timing: number): number {
  return timing * (2 - timing);
}
