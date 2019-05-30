import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';
import OLPolygon from 'ol/geom/Polygon';
import OLVectorLayer from 'ol/layer/Vector';
import OLRenderCanvas from 'ol/render/canvas';
import OLFill from 'ol/style/Fill';
import OLStyle from 'ol/style/Style';
import { PolyfillExtent } from '../../../polyfills/PolyfillExtent';
import { ColourUtils } from '../../../utils/ColourUtils';
import { GeometryUtils } from '../../../utils/GeometryUtils';
import { AlloyAnimationManager } from '../../animations/AlloyAnimationManager';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyFeature } from '../../features/AlloyFeature';

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
 * animation manager for cables
 * @ignore
 * @internal
 */
export class AlloyCableAnimationManager extends AlloyAnimationManager {
  /**
   * creates a new instance
   * @param map the alloy map to animate
   */
  public constructor(map: AlloyMap) {
    super(map);
  }

  /**
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
        let nose: [number, number];
        let back: [number, number];

        if (ratio > 1 - currentScaleRatio) {
          back = GeometryUtils.rotateCoordinate(
            lineString.getCoordinateAt(ratio - currentScaleRatio),
            DEGREES_90_IN_RADIANS,
            centre,
          );
          nose = GeometryUtils.rotateCoordinate(
            lineString.getCoordinateAt(1),
            DEGREES_90_IN_RADIANS,
            centre,
          );
        } else {
          back = GeometryUtils.rotateCoordinate(
            lineString.getCoordinateAt(ratio - currentScaleRatio),
            DEGREES_90_IN_RADIANS,
            centre,
          );
          nose = GeometryUtils.rotateCoordinate(
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

        const b1: [number, number] = GeometryUtils.rotateCoordinate(
          centre,
          DEGREES_90_IN_RADIANS / 3,
          nose,
        );
        const n1: [number, number] = GeometryUtils.rotateCoordinate(
          centre,
          DEGREES_90_IN_RADIANS / 3,
          back,
        );

        const b2: [number, number] = GeometryUtils.rotateCoordinate(
          back,
          DEGREES_90_IN_RADIANS,
          b1,
        );
        const n2: [number, number] = GeometryUtils.rotateCoordinate(
          nose,
          DEGREES_90_IN_RADIANS,
          n1,
        );

        const coordinates: Array<[number, number]> = [];
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