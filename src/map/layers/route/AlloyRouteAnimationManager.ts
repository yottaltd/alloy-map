import { Coordinate as OLCoordinate } from 'ol/coordinate';
import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';
import OLPolygon from 'ol/geom/Polygon';
import OLCanvasImmediateRenderer from 'ol/render/canvas/Immediate';
import OLFill from 'ol/style/Fill';
import OLStyle from 'ol/style/Style';
import { PolyfillExtent } from '../../../polyfills/PolyfillExtent';
import { ColourUtils } from '../../../utils/ColourUtils';
import { GeometryUtils } from '../../../utils/GeometryUtils';
import { AlloyAnimationManager } from '../../animations/AlloyAnimationManager';
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
 * animation manager handles common animation utilities
 * @ignore
 * @internal
 */
export class AlloyRouteAnimationManager extends AlloyAnimationManager {
  /**
   * @implements
   */
  public startAnimation(route: AlloyFeature) {
    this.startFeatureAnimation(
      route.olFeature,
      (
        lineString: OLLineString,
        currentScaleRatio: number,
        renderer: OLCanvasImmediateRenderer,
        ratio: number,
      ) => {
        const centre: OLCoordinate = lineString.getCoordinateAt(ratio);
        const nose: OLCoordinate =
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

        const noseClockwise90Degrees = GeometryUtils.rotateCoordinate(
          nose,
          DEGREES_90_IN_RADIANS,
          centre,
        );
        const noseCounterClockwise90Degrees = GeometryUtils.rotateCoordinate(
          nose,
          -DEGREES_90_IN_RADIANS,
          centre,
        );

        // vector coordinate - distance between centre coordinates
        const vector = [nose[0] - centre[0], nose[1] - centre[1]];

        // construct the path
        const coordinates: OLCoordinate[] = [];
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
    );
  }
}
