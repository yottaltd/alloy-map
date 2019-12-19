import { EventsKey as OLEventsKey } from 'ol/events';
import OLFeature from 'ol/Feature';
import OLGeometryType from 'ol/geom/GeometryType';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLVectorLayer from 'ol/layer/Vector';
import OLCanvasImmediateRenderer from 'ol/render/canvas/Immediate';
import OLRenderEvent from 'ol/render/Event';
import { PolyfillExtent } from '../../polyfills/PolyfillExtent';
import { PolyfillObservable } from '../../polyfills/PolyfillObservable';
import { PolyfillVectorContext } from '../../polyfills/PolyfillVectorContext';
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
   * Openlayers layer for animations to animate "under"
   */
  private readonly olPrecomposeLayer?: OLVectorLayer;

  /**
   * a lookup of features with active animating events keys
   */
  private readonly animationKeys: Map<OLFeature, OLEventsKey | OLEventsKey[]> = new Map();

  /**
   * the features that are currently animating
   */
  private readonly animatingFeatures: Set<OLFeature> = new Set();

  /**
   * a map of linestrings to their ratio offsets
   * This is a ration offset for current animation frame for a line string
   * that animated geometries are offset by inside of theirs animation partitions
   */
  private readonly lineOffsets: Map<OLLineString, number> = new Map();

  /**
   * creates a new instance
   * @param map the alloy map to animate
   * @param olPrecomposeLayer optional layer under which animations will be drawn
   * otherwise they will be drawn on top of everything
   */
  public constructor(map: AlloyMap, olPrecomposeLayer?: OLVectorLayer) {
    this.map = map;
    this.olPrecomposeLayer = olPrecomposeLayer;
  }

  /**
   * starts the animation for a feature
   * @param path the feature
   */
  public abstract startAnimation(path: AlloyFeature): void;

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
    this.animatingFeatures.delete(feature.olFeature);
  }

  /**
   * starts an animation for a feature
   * @param feature the feature to animate
   * @param stepRenderer callback function for each "step" during an animation
   */
  protected startFeatureAnimation(
    feature: OLFeature,
    stepRenderer: (
      lineString: OLLineString,
      currentScaleRatio: number,
      renderer: OLCanvasImmediateRenderer,
      ratio: number,
    ) => void,
  ) {
    if (this.animatingFeatures.has(feature)) {
      this.animatingFeatures.delete(feature);
    }
    this.animatingFeatures.add(feature);

    const animateLineString = (lineString: OLLineString) => {
      const length = lineString.getLength();
      const ratioStep = Math.max(50, Math.min(Math.sqrt(length), 500));
      const scale = ratioStep / length;
      const scale1m = 1 / length;

      this.animateAlongLineString(
        feature,
        lineString,
        length * 25,
        scale,
        (renderer: OLCanvasImmediateRenderer, ratio: number) => {
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
      );
    };

    if (feature.getGeometry().getType() === OLGeometryType.LINE_STRING) {
      animateLineString(feature.getGeometry() as OLLineString);
    } else if (feature.getGeometry().getType() === OLGeometryType.MULTI_LINE_STRING) {
      (feature.getGeometry() as OLMultiLineString).getLineStrings().forEach(animateLineString);
    }
  }

  /**
   * sets the animation for a feature
   * @param feature the feature to animate
   * @param animationListener the animation listener used to provide callbacks and drawing
   * @param duration the time of the animation in milliseconds
   */
  private setFeatureAnimation(
    feature: OLFeature,
    animationListener: AlloyAnimationListener,
    duration: number,
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
      (this.olPrecomposeLayer || this.map.olMap).on(
        this.olPrecomposeLayer ? 'prerender' : 'postcompose',
        (e) => {
          const event: OLRenderEvent = e as OLRenderEvent;
          const elapsed: number = event.frameState.time - start;
          const elapsedRatio: number = Math.min(elapsed / duration, 1.0);

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
    renderStepDraw: (renderer: OLCanvasImmediateRenderer, ratio: number) => void,
  ): void {
    const lineStringFeature = new OLFeature(lineString);

    let centreChangeListener: OLEventsKey | OLEventsKey[] = [];
    let resolutionChangeListener: OLEventsKey | OLEventsKey[] = [];
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
              this.animateAlongLineString(feature, lineString, timerMs, scale, renderStepDraw);
            }
          };
          centreChangeListener = this.map.olMap.on('change:center', el);
          resolutionChangeListener = this.map.olMap.on('change:resolution', el);
        },
        compose: (renderer: OLCanvasImmediateRenderer, ratio: number) => {
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
            this.animateAlongLineString(feature, lineString, timerMs, scale, renderStepDraw);
          } else {
            removeListeners();
            this.lineOffsets.delete(lineString);
          }
        },
      },
      timerMs,
    );
  }
}
