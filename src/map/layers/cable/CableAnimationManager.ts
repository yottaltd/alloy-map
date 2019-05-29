import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';
import OLPolygon from 'ol/geom/Polygon';
import OLVectorLayer from 'ol/layer/Vector';
import OLRenderCanvas from 'ol/render/canvas';
import OLFill from 'ol/style/Fill';
import OLStyle from 'ol/style/Style';
import { PolyfillExtent } from '../../../polyfills/PolyfillExtent';
import { ColourUtils } from '../../../utils/ColourUtils';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AnimationManager } from '../../animations/AnimationManager';

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
 * @internal
 */
export class CableAnimationManager extends AnimationManager {
  /**
   * creates a new instance
   * @param map the alloy map to animate
   */
  public constructor(map: AlloyMap) {
    super(map);
  }

  /**
   * starts the cable animation for a feature
   * @param cable the cable feature
   * @param precomposeLayer the layer being drawn to for animations
   * @implements
   */
  public startAnimation(cable: AlloyFeature, precomposeLayer?: OLVectorLayer) {
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
}
