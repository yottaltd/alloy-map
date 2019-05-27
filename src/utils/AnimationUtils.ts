import { containsCoordinate, intersects } from 'ol/extent.js';
import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import OLRenderCanvas from 'ol/render/canvas';
import OLRenderEvent from 'ol/render/Event';
import OLFill from 'ol/style/Fill';
import OLStyle from 'ol/style/Style';
import OLVectorLayer from 'ol/layer/Vector';
import { AlloyMap } from '../map/core/AlloyMap';
import { AlloyFeature } from '../map/features/AlloyFeature';
import { AlloyLayer } from '../map/layers/AlloyLayer';
import { PolyfillObservable } from '../polyfills/PolyfillObservable';
import { AnimationListener } from './AnimationListener';

const DEG_90_IN_RAD: number = Math.PI / 2;
const CHEVRON_COLOUR: [number, number, number] = [245, 245, 245];

export class AnimationUtils {
  private static readonly ANIMATION_KEYS: Readonly<Map<OLFeature, ol.EventsKey>> = new Map();
  private static readonly ANIMATING_FEATURES_SET: Readonly<Set<OLFeature>> = new Set();
  private static readonly LINE_OFFSET_MAP: Readonly<Map<OLLineString, number>> = new Map();

  /**
   * Rotates a coordinate around the anchor
   * @param coordinate
   * @param angleRad
   * @param anchor
   */
  private static rotateCoordinate(
    coordinate: ol.Coordinate,
    angleRad: number,
    anchor: ol.Coordinate,
  ): ol.Coordinate {
    const p = new OLPoint(coordinate);
    p.rotate(angleRad, anchor);
    return p.getCoordinates();
  }

  private static rgbToRgba(rgb: [number, number, number], alpha: number): string {
    return `rgba(${rgb.join(',')}, ${alpha})`;
  }

  private map: AlloyMap;

  public constructor(map: AlloyMap) {
    this.map = map;
  }

  public clearAnimations() {
    AnimationUtils.ANIMATING_FEATURES_SET.clear();
  }

  public stopFeatureAnimation(feature: AlloyFeature) {
    AnimationUtils.ANIMATING_FEATURES_SET.delete(feature.olFeature);
  }

  public startRouteAnimation(route: AlloyFeature, precomposeLayer?: OLVectorLayer) {
    this.startFeatureAnimation(
      route.olFeature,
      (
        lineString: OLLineString,
        currentScaleRatio: number,
        renderer: OLRenderCanvas.Immediate,
        ratio: number,
      ) => {
        let centre: ol.Coordinate;
        let nose: ol.Coordinate;
        if (ratio > 1 - currentScaleRatio) {
          centre = lineString.getCoordinateAt(ratio);
          nose = lineString.getCoordinateAt(1);
        } else {
          centre = lineString.getCoordinateAt(ratio);
          nose = lineString.getCoordinateAt(ratio + currentScaleRatio);
        }
        // don't draw if coordinates are not in the view extent
        const viewExtent = this.map.viewport.toMapExtent();
        if (!containsCoordinate(viewExtent, centre) && !containsCoordinate(viewExtent, nose)) {
          return;
        }
        // create style with opacity for current ratio
        const routingStyle = new OLStyle({
          fill: new OLFill({
            color: AnimationUtils.rgbToRgba(CHEVRON_COLOUR, 0.4 + Math.sin(Math.PI * ratio) / 2)!,
          }),
        });

        const c1 = AnimationUtils.rotateCoordinate(nose, DEG_90_IN_RAD, centre);
        const c2 = AnimationUtils.rotateCoordinate(nose, -DEG_90_IN_RAD, centre);
        // vector coordinate - distance between centre coordinates
        const v = [nose[0] - centre[0], nose[1] - centre[1]];

        const coordinates: ol.Coordinate[] = [];
        coordinates.push(nose);
        coordinates.push(c1);
        coordinates.push([c1[0] - v[0], c1[1] - v[1]]);
        coordinates.push(centre);
        coordinates.push([c2[0] - v[0], c2[1] - v[1]]);
        coordinates.push(c2);
        coordinates.push(nose);

        renderer.drawFeature(new OLFeature(new OLPolygon([coordinates])), routingStyle);
      },
      precomposeLayer,
    );
  }

  public startCableAnimation(cable: AlloyFeature, precomposeLayer?: OLVectorLayer) {
    this.startFeatureAnimation(
      cable.olFeature,
      (
        lineString: OLLineString,
        currentScaleRatio: number,
        renderer: OLRenderCanvas.Immediate,
        ratio: number,
      ) => {
        const centre: ol.Coordinate = lineString.getCoordinateAt(ratio);
        let nose: ol.Coordinate;
        let back: ol.Coordinate;
        if (ratio > 1 - currentScaleRatio) {
          back = AnimationUtils.rotateCoordinate(
            lineString.getCoordinateAt(ratio - currentScaleRatio),
            DEG_90_IN_RAD,
            centre,
          );
          nose = AnimationUtils.rotateCoordinate(
            lineString.getCoordinateAt(1),
            DEG_90_IN_RAD,
            centre,
          );
        } else {
          back = AnimationUtils.rotateCoordinate(
            lineString.getCoordinateAt(ratio - currentScaleRatio),
            DEG_90_IN_RAD,
            centre,
          );
          nose = AnimationUtils.rotateCoordinate(
            lineString.getCoordinateAt(ratio + currentScaleRatio),
            DEG_90_IN_RAD,
            centre,
          );
        }

        // don't draw if coordinates are not in the view extent
        const viewExtent = this.map.viewport.toMapExtent();
        if (!containsCoordinate(viewExtent, centre) && !containsCoordinate(viewExtent, nose)) {
          return;
        }

        // create style with opacity for current ratio
        const cableStyle = new OLStyle({
          fill: new OLFill({
            color: AnimationUtils.rgbToRgba(CHEVRON_COLOUR, 0.4 + Math.sin(Math.PI * ratio) / 2)!,
          }),
        });

        const b1: ol.Coordinate = AnimationUtils.rotateCoordinate(centre, DEG_90_IN_RAD / 3, nose);
        const n1: ol.Coordinate = AnimationUtils.rotateCoordinate(centre, DEG_90_IN_RAD / 3, back);

        const b2: ol.Coordinate = AnimationUtils.rotateCoordinate(back, DEG_90_IN_RAD, b1);
        const n2: ol.Coordinate = AnimationUtils.rotateCoordinate(nose, DEG_90_IN_RAD, n1);

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

  private setFeatureAnimation(
    feature: OLFeature,
    animationListener: AnimationListener,
    timeMs: number,
    precomposeObject?: ol.Observable,
  ) {
    if (AnimationUtils.ANIMATION_KEYS.has(feature)) {
      PolyfillObservable.unByKey(AnimationUtils.ANIMATION_KEYS.get(feature)!);
      AnimationUtils.ANIMATION_KEYS.delete(feature);
    }

    animationListener.preAnimation();

    const start = new Date();
    AnimationUtils.ANIMATION_KEYS.set(
      feature,
      (precomposeObject || this.map.olMap).on(
        precomposeObject ? 'precompose' : 'postcompose',
        (e) => {
          const event: OLRenderEvent = e as OLRenderEvent;
          const elapsed: number = event.frameState.time - start.getTime();
          const elapsedRatio: number = Math.min(elapsed / timeMs, 1.0);

          animationListener.compose(
            event.vectorContext as OLRenderCanvas.Immediate,
            elapsedRatio,
          );

          if (elapsed >= timeMs) {
            const key = AnimationUtils.ANIMATION_KEYS.get(feature);
            if (key) {
              PolyfillObservable.unByKey(key);
            }
            AnimationUtils.ANIMATION_KEYS.delete(feature);
            animationListener.postAnimation();
            return;
          }
          this.map.olMap.render();
        },
      ),
    );
    this.map.olMap.render();
  }

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
    if (AnimationUtils.ANIMATING_FEATURES_SET.has(route)) {
      AnimationUtils.ANIMATING_FEATURES_SET.delete(route);
    }
    AnimationUtils.ANIMATING_FEATURES_SET.add(route);

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
    const offset = AnimationUtils.LINE_OFFSET_MAP.get(lineString) || 0;

    this.setFeatureAnimation(
      lineStringFeature,
      {
        preAnimation: () => {
          const el = (e) => {
            if (!paused) {
              return;
            }
            const viewExtent = this.map.viewport.toMapExtent();
            if (intersects(viewExtent, lineString.getExtent())) {
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
          if (AnimationUtils.ANIMATING_FEATURES_SET.has(feature)) {
            const ratioDiff = ratio % scale;
            let ratioC = ratioDiff;
            if (ratio >= 1) {
              AnimationUtils.LINE_OFFSET_MAP.set(lineString, ratioDiff);
            }
            while (ratioC < 1) {
              renderStepDraw(renderer, ratioC);
              ratioC += scale;
            }
          } else {
            const key = AnimationUtils.ANIMATION_KEYS.get(lineStringFeature);
            if (key) {
              PolyfillObservable.unByKey(key);
            }
          }
        },
        postAnimation: () => {
          // repeat animation if it wasn't removed
          if (AnimationUtils.ANIMATING_FEATURES_SET.has(feature)) {
            const viewExtent = this.map.viewport.toMapExtent();
            if (!intersects(viewExtent, lineString.getExtent())) {
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
            AnimationUtils.LINE_OFFSET_MAP.delete(lineString);
          }
        },
      },
      timerMs,
      precomposeObject,
    );
  }
}
