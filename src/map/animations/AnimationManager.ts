import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import OLVectorLayer from 'ol/layer/Vector';
import OLRenderCanvas from 'ol/render/canvas';
import OLRenderEvent from 'ol/render/Event';
import OLFill from 'ol/style/Fill';
import OLStyle from 'ol/style/Style';
import { PolyfillExtent } from '../../polyfills/PolyfillExtent';
import { PolyfillObservable } from '../../polyfills/PolyfillObservable';
import { ColourUtils } from '../../utils/ColourUtils';
import { AlloyMap } from '../core/AlloyMap';
import { AlloyFeature } from '../features/AlloyFeature';
import { AnimationListener } from './AnimationListener';

// TODO refactor
// I started commenting this class but the whole start/set feels like spaghetti with 2 maps managing
// feature animations etc. oleg wants to split this class up anyway so will review again later.

/**
 * 90 degrees in radians
 * @ignore
 */
const DEGREES_90_IN_RADIANS: number = Math.PI / 2;

/**
 * the colour of chevrons in rgb
 * @ignore
 */
const CHEVRON_COLOUR: string = 'rgb(245, 245, 245)';

/**
 * animation manager handles common animation utilities
 * @ignore
 */
export class AnimationManager {
  /**
   * rotates a coordinate around the anchor
   * @param coordinate
   * @param angleRad
   * @param anchor
   */
  private static rotateCoordinate(
    coordinate: [number, number],
    angleRad: number,
    anchor: [number, number],
  ): [number, number] {
    const p = new OLPoint(coordinate);
    p.rotate(angleRad, anchor);
    return p.getCoordinates();
  }

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
   * a reference to the alloy map being animated
   */
  private readonly map: AlloyMap;

  /**
   * creates a new instance
   * @param map the alloy map to animate
   */
  public constructor(map: AlloyMap) {
    this.map = map;
  }

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
   * starts the routing animation for a feature
   * @param route the route feature to animate
   * @param precomposeLayer the layer being drawn to for animations
   */
  public startRouteAnimation(route: AlloyFeature, precomposeLayer?: OLVectorLayer) {
    this.startFeatureAnimation(
      route.olFeature,
      (
        lineString: OLLineString,
        currentScaleRatio: number,
        renderer: OLRenderCanvas.Immediate,
        ratio: number,
      ) => {
        const centre: [number, number] = lineString.getCoordinateAt(ratio);
        const nose: [number, number] =
          ratio > 1 - currentScaleRatio
            ? lineString.getCoordinateAt(1)
            : lineString.getCoordinateAt(ratio + currentScaleRatio);

        // don't draw if coordinates are not in the view extent
        const viewExtent = this.map.viewport.toMapExtent();
        if (
          !PolyfillExtent.containsCoordinate(viewExtent, centre) &&
          !PolyfillExtent.containsCoordinate(viewExtent, nose)
        ) {
          return;
        }

        // create style with opacity for current ratio
        const routingStyle = new OLStyle({
          fill: new OLFill({
            color: ColourUtils.opacity(CHEVRON_COLOUR, 0.4 + Math.sin(Math.PI * ratio) / 2)!,
          }),
        });

        const noseClockwise90Degrees = AnimationManager.rotateCoordinate(
          nose,
          DEGREES_90_IN_RADIANS,
          centre,
        );
        const noseCounterClockwise90Degrees = AnimationManager.rotateCoordinate(
          nose,
          -DEGREES_90_IN_RADIANS,
          centre,
        );

        // vector coordinate - distance between centre coordinates
        const vector = [nose[0] - centre[0], nose[1] - centre[1]];

        // construct the path
        const coordinates: Array<[number, number]> = [];
        coordinates.push(nose);
        coordinates.push(noseClockwise90Degrees);
        coordinates.push([
          noseClockwise90Degrees[0] - vector[0],
          noseClockwise90Degrees[1] - vector[1],
        ]);
        coordinates.push(centre);
        coordinates.push([
          noseCounterClockwise90Degrees[0] - vector[0],
          noseCounterClockwise90Degrees[1] - vector[1],
        ]);
        coordinates.push(noseCounterClockwise90Degrees);
        coordinates.push(nose);

        renderer.drawFeature(new OLFeature(new OLPolygon([coordinates])), routingStyle);
      },
      precomposeLayer,
    );
  }

  /**
   * starts the cable animation for a feature
   * @param cable the cable feature
   * @param precomposeLayer the layer being drawn to for animations
   */
  public startCableAnimation(cable: AlloyFeature, precomposeLayer?: OLVectorLayer) {
    this.startFeatureAnimation(
      cable.olFeature,
      (
        lineString: OLLineString,
        currentScaleRatio: number,
        renderer: OLRenderCanvas.Immediate,
        ratio: number,
      ) => {
        // calculate coordinates for positioning
        const centre: [number, number] = lineString.getCoordinateAt(ratio);
        let nose: ol.Coordinate;
        let back: ol.Coordinate;

        if (ratio > 1 - currentScaleRatio) {
          back = AnimationManager.rotateCoordinate(
            lineString.getCoordinateAt(ratio - currentScaleRatio),
            DEGREES_90_IN_RADIANS,
            centre,
          );
          nose = AnimationManager.rotateCoordinate(
            lineString.getCoordinateAt(1),
            DEGREES_90_IN_RADIANS,
            centre,
          );
        } else {
          back = AnimationManager.rotateCoordinate(
            lineString.getCoordinateAt(ratio - currentScaleRatio),
            DEGREES_90_IN_RADIANS,
            centre,
          );
          nose = AnimationManager.rotateCoordinate(
            lineString.getCoordinateAt(ratio + currentScaleRatio),
            DEGREES_90_IN_RADIANS,
            centre,
          );
        }

        // don't draw if coordinates are not in the view extent
        const viewExtent = this.map.viewport.toMapExtent();
        if (
          !PolyfillExtent.containsCoordinate(viewExtent, centre) &&
          !PolyfillExtent.containsCoordinate(viewExtent, nose)
        ) {
          return;
        }

        // create style with opacity for current ratio
        const cableStyle = new OLStyle({
          fill: new OLFill({
            color: ColourUtils.opacity(CHEVRON_COLOUR, 0.4 + Math.sin(Math.PI * ratio) / 2)!,
          }),
        });

        const b1: ol.Coordinate = AnimationManager.rotateCoordinate(
          centre,
          DEGREES_90_IN_RADIANS / 3,
          nose,
        );
        const n1: ol.Coordinate = AnimationManager.rotateCoordinate(
          centre,
          DEGREES_90_IN_RADIANS / 3,
          back,
        );

        const b2: ol.Coordinate = AnimationManager.rotateCoordinate(
          back,
          DEGREES_90_IN_RADIANS,
          b1,
        );
        const n2: ol.Coordinate = AnimationManager.rotateCoordinate(
          nose,
          DEGREES_90_IN_RADIANS,
          n1,
        );

        const coordinates: ol.Coordinate[] = [];
        coordinates.push(nose);
        coordinates.push(n1);
        coordinates.push(n2);
        coordinates.push(back);
        coordinates.push(b1);
        coordinates.push(b2);
        coordinates.push(nose);

        renderer.drawFeature(new OLFeature(new OLPolygon([coordinates])), cableStyle);
      },
      precomposeLayer,
    );
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
    animationListener: AnimationListener,
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

  /**
   * starts an animation for a feature
   * @param route
   * @param stepRenderer
   * @param precomposeObject
   */
  private startFeatureAnimation(
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
