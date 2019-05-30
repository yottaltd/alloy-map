import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLVectorLayer from 'ol/layer/Vector';
import OLRenderCanvas from 'ol/render/canvas';
import OLRenderEvent from 'ol/render/Event';
import { PolyfillExtent } from '../../polyfills/PolyfillExtent';
import { PolyfillObservable } from '../../polyfills/PolyfillObservable';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyAnimationListener } from './AlloyAnimationListener';

/**
 * animation manager handles common animation utilities
 * @ignore
 * @internal
 */
export abstract class AlloyAnimationManager {
  /**
   * a reference to the alloy map being animated
   */
  protected readonly map: AlloyMap;

  /**
   * a lookup of features with active animating events keys
   */
  private readonly animationKeys: Map<OLFeature, ol.EventsKey> = new Map();

  /**
   * the features that are currently animating
   */
  private readonly animatingFeatures: Set<OLFeature> = new Set();

  /**
   * a map of linestrings to their ratio offsets (OLEG I HAVE NO IDEA WHAT THIS DOES XD)
   */
  private readonly lineOffsets: Map<OLLineString, number> = new Map();

  /**
   * creates a new instance
   * @param map the alloy map to animate
   */
  public constructor(map: AlloyMap) {
    this.map = map;
  }

  /**
   * starts the animation for a feature
   * @param cable the feature
   * @param precomposeLayer the layer before which animatiosn are drawn
   */
  public abstract startAnimation(cable: AlloyFeature, precomposeLayer?: OLVectorLayer): void;

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
  public stopFeatureAnimation(feature: AlloyFeature) {
    this.animatingFeatures.delete(feature.olFeature);
  }

  /**
   * starts an animation for a feature
   * @param route
   * @param stepRenderer
   * @param precomposeObject
   */
  protected startFeatureAnimation(
    route: OLFeature,
    stepRenderer: (
      lineString: OLLineString,
      currentScaleRatio: number,
      renderer: OLRenderCanvas.Immediate,
      ratio: number,
    ) => void,
    precomposeObject?: ol.Observable,
  ) {
    if (this.animatingFeatures.has(route)) {
      this.animatingFeatures.delete(route);
    }
    this.animatingFeatures.add(route);

    const animateLineString = (lineString: OLLineString) => {
      const length = lineString.getLength();
      const ratioStep = Math.max(50, Math.min(Math.sqrt(length), 500));
      const scale = ratioStep / length;
      const scale1m = 1 / length;

      this.animateAlongLineString(
        route,
        lineString,
        length * 25,
        scale,
        (renderer: OLRenderCanvas.Immediate, ratio: number) => {
          let cs1m = scale1m * 2;
          switch (Math.round(this.map.zoom)) {
            case 20:
              cs1m *= 0.75;
              break;
            case 21:
              cs1m *= 0.5;
              break;
            case 22:
              cs1m *= 0.33;
              break;
          }
          stepRenderer(lineString, cs1m, renderer, ratio);
        },
        precomposeObject,
      );
    };

    if (route.getGeometry().getType() === 'LineString') {
      animateLineString(route.getGeometry() as OLLineString);
    } else if (route.getGeometry().getType() === 'MultiLineString') {
      (route.getGeometry() as OLMultiLineString).getLineStrings().forEach(animateLineString);
    }
  }

  /**
   * sets the animation for a feature
   * @param feature the feature to animate
   * @param animationListener the animation listener used to provide callbacks and drawing
   * @param duration the time of the animation in milliseconds
   * @param precomposeObject the precomposable object being animated e.g. openlayers layer
   */
  private setFeatureAnimation(
    feature: OLFeature,
    animationListener: AlloyAnimationListener,
    duration: number,
    precomposeObject?: ol.Observable,
  ) {
    // remove existing animation for feature if already setup
    if (this.animationKeys.has(feature)) {
      PolyfillObservable.unByKey(this.animationKeys.get(feature)!);
      this.animationKeys.delete(feature);
    }

    // call pre animation handler
    animationListener.preAnimation();

    // remember the start time
    const start = new Date().getTime();

    // set the animation going
    this.animationKeys.set(
      feature,
      (precomposeObject || this.map.olMap).on(
        precomposeObject ? 'precompose' : 'postcompose',
        (e) => {
          const event: OLRenderEvent = e as OLRenderEvent;
          const elapsed: number = event.frameState.time - start;
          const elapsedRatio: number = Math.min(elapsed / duration, 1.0);

          // call the handler for composing the animation (this does the work per type of animation)
          animationListener.compose(
            event.vectorContext as OLRenderCanvas.Immediate,
            elapsedRatio,
          );

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
        },
      ),
    );

    // force a re-render
    this.map.olMap.render();
  }

  private animateAlongLineString(
    feature: OLFeature,
    lineString: OLLineString,
    timerMs: number,
    scale: number,
    renderStepDraw: (renderer: OLRenderCanvas.Immediate, ratio: number) => void,
    precomposeObject?: ol.Observable,
  ): void {
    const lineStringFeature = new OLFeature(lineString);

    let centreChangeListener: ol.EventsKey | null = null;
    let resolutionChangeListener: ol.EventsKey | null = null;
    let paused = false;
    const removeListeners = () => {
      if (centreChangeListener) {
        PolyfillObservable.unByKey(centreChangeListener);
      }
      if (resolutionChangeListener) {
        PolyfillObservable.unByKey(resolutionChangeListener);
      }
    };
    const offset = this.lineOffsets.get(lineString) || 0;

    this.setFeatureAnimation(
      lineStringFeature,
      {
        preAnimation: () => {
          const el = (e) => {
            if (!paused) {
              return;
            }
            const viewExtent = this.map.viewport.toMapExtent();
            if (PolyfillExtent.intersects(viewExtent, lineString.getExtent())) {
              removeListeners();
              this.animateAlongLineString(
                feature,
                lineString,
                timerMs,
                scale,
                renderStepDraw,
                precomposeObject,
              );
            }
          };
          centreChangeListener = this.map.olMap.on('change:center', el);
          resolutionChangeListener = this.map.olMap.on('change:resolution', el);
        },
        compose: (renderer: OLRenderCanvas.Immediate, ratio: number) => {
          if (this.map.zoom < 18) {
            return;
          }
          ratio += offset;
          if (this.animatingFeatures.has(feature)) {
            const ratioDiff = ratio % scale;
            let ratioC = ratioDiff;
            if (ratio >= 1) {
              this.lineOffsets.set(lineString, ratioDiff);
            }
            while (ratioC < 1) {
              renderStepDraw(renderer, ratioC);
              ratioC += scale;
            }
          } else {
            const key = this.animationKeys.get(lineStringFeature);
            if (key) {
              PolyfillObservable.unByKey(key);
            }
          }
        },
        postAnimation: () => {
          // repeat animation if it wasn't removed
          if (this.animatingFeatures.has(feature)) {
            const viewExtent = this.map.viewport.toMapExtent();
            if (!PolyfillExtent.intersects(viewExtent, lineString.getExtent())) {
              paused = true;
              return;
            }
            removeListeners();
            this.animateAlongLineString(
              feature,
              lineString,
              timerMs,
              scale,
              renderStepDraw,
              precomposeObject,
            );
          } else {
            removeListeners();
            this.lineOffsets.delete(lineString);
          }
        },
      },
      timerMs,
      precomposeObject,
    );
  }
}
