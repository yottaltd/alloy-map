import { Coordinate as OLCoordinate } from 'ol/coordinate';
import { easeOut } from 'ol/easing';
import { EventsKey as OLEventsKey } from 'ol/events';
import OLLineString from 'ol/geom/LineString';
import OLCanvasImmediateRenderer from 'ol/render/canvas/Immediate';
import OLRenderEvent from 'ol/render/Event';
import { PolyfillObservable } from '../../polyfills/PolyfillObservable';
import { PolyfillVectorContext } from '../../polyfills/PolyfillVectorContext';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyAnimationListener } from './AlloyAnimationListener';

/**
 * animation time
 * @ignore
 * @internal
 */
const ANIMATION_TIME = 500;

/**
 * animation manager handles common animation utilities
 * @ignore
 * @internal
 */
export abstract class AlloySingleAnimationManager {
  /**
   * a reference to the alloy map being animated
   */
  protected readonly map: AlloyMap;

  /**
   * a lookup of features with active animating events keys
   */
  private readonly animationKeys: Map<AlloyFeature, OLEventsKey | OLEventsKey[]> = new Map();

  /**
   * the features that are currently animating
   */
  private readonly animatingFeatures: Set<AlloyFeature> = new Set();

  /**
   * creates a new instance
   * @param map the alloy map to animate
   */
  public constructor(map: AlloyMap) {
    this.map = map;
  }

  /**
   * starts the animation for a feature
   * @param feature the feature to animate
   * @param path linestring that feature is moved along during animation
   * @param isForward whether feature is animated forwards or backwards along the path
   * @param customPostrender optional custom function to run once animation process is finished
   */
  public abstract startAnimation(
    feature: AlloyFeature,
    path: OLLineString,
    isForward: boolean,
    customPostrender?: () => void,
  ): void;

  /**
   * clears all running animations
   */
  public clearAnimations() {
    this.animatingFeatures.clear();
  }

  /**
   * stops animation a single feature
   * @param feature the feature to stop animations for
   */
  public stopAnimation(feature: AlloyFeature) {
    this.animatingFeatures.delete(feature);
  }

  /**
   * starts an animation for a feature
   * @param feature the feature to animate
   * @param line linestring feature is animated along
   * @param stepRenderer callback function for each "step" during an animation
   */
  protected startFeatureAnimation(
    feature: AlloyFeature,
    line: OLLineString,
    stepRenderer: (renderer: OLCanvasImmediateRenderer, coordinate: OLCoordinate) => void,
    customPostrender?: () => void,
  ) {
    if (this.animatingFeatures.has(feature)) {
      this.animatingFeatures.delete(feature);
    }

    this.animatingFeatures.add(feature);

    this.setFeatureAnimation(
      feature,
      {
        preAnimation: () => {
          // don't do anything
        },
        compose: (renderer: OLCanvasImmediateRenderer, ratio: number) => {
          if (this.animatingFeatures.has(feature)) {
            stepRenderer(renderer, line.getCoordinateAt(ratio));
          } else {
            const key = this.animationKeys.get(feature);
            if (key) {
              PolyfillObservable.unByKey(key);
            }
          }
        },
        postAnimation: () => {
          if (customPostrender) {
            customPostrender();
          }
        },
      },
      ANIMATION_TIME,
    );
  }

  /**
   * sets the animation for a feature
   * @param feature the feature to animate
   * @param animationListener the animation listener used to provide callbacks and drawing
   * @param duration the time of the animation in milliseconds
   */
  private setFeatureAnimation(
    feature: AlloyFeature,
    animationListener: AlloyAnimationListener,
    duration: number,
  ) {
    // remove existing animation for feature if already setup
    if (this.animationKeys.has(feature)) {
      const key = this.animationKeys.get(feature);
      if (key) {
        PolyfillObservable.unByKey(key);
      }
      this.animationKeys.delete(feature);
    }

    if (!this.map.basemap) {
      return;
    }

    // call pre animation handler
    animationListener.preAnimation();

    // remember the start time
    const start = new Date().getTime();

    // set the animation going
    this.animationKeys.set(
      feature,
      this.map.basemap.layer.on('postrender', (e) => {
        const event: OLRenderEvent = e as OLRenderEvent;
        const elapsed: number = event.frameState.time - start;
        const elapsedRatio: number = easeOut(Math.min(elapsed / duration, 1.0));

        // call the handler for composing the animation (this does the work per type of animation)
        animationListener.compose(PolyfillVectorContext.getVectorContext(event), elapsedRatio);

        // cleanup the animation if its finished
        if (elapsed >= duration) {
          const key = this.animationKeys.get(feature);
          if (key) {
            PolyfillObservable.unByKey(key);
          }
          this.animationKeys.delete(feature);

          // call post animation handler
          animationListener.postAnimation();
          return;
        }

        // re-render the map
        this.map.olMap.render();
      }),
    );

    // // force a re-render
    this.map.olMap.render();
  }
}
