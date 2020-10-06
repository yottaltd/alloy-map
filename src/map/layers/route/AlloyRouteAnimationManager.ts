import { AlloyAnimationManager } from '@/map/animations/AlloyAnimationManager';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { PolyfillExtent } from '@/polyfills/PolyfillExtent';
import { ColourUtils } from '@/utils/ColourUtils';
import { Coordinate as OLCoordinate } from 'ol/coordinate';
import OLLineString from 'ol/geom/LineString';
import OLPolygon from 'ol/geom/Polygon';
import OLCanvasImmediateRenderer from 'ol/render/canvas/Immediate';
import OLFill from 'ol/style/Fill';
import OLStyle from 'ol/style/Style';

/**
 * 90 degrees in radians
 * @ignore
 */
const DEGREES_90_IN_RADIANS: number = Math.PI / 2;

/**
 * the colour of chevrons in rgb
 * @ignore
 */
const CHEVRON_COLOUR = 'rgb(245, 245, 245)';

/**
 * Chevron shape for route animation
 * @ignore
 */
const SHAPE: OLPolygon = new OLPolygon([
  [
    [0, 0],
    [1, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
    [-1, -1],
    [0, 0],
  ],
]);

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
            color: ColourUtils.opacity(CHEVRON_COLOUR, 0.4 + Math.sin(Math.PI * ratio) / 2),
          }),
        });

        // vector coordinate - distance between centre and front coordinates
        const vector = [centre[0] - nose[0], centre[1] - nose[1]];

        // clone animated shape polygon and position it
        const polygon = SHAPE.clone();
        polygon.rotate(DEGREES_90_IN_RADIANS + Math.atan2(vector[1], vector[0]), [0, 0]);
        polygon.scale(Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2)));
        polygon.translate(centre[0], centre[1]);

        // set render style and draw geometry
        renderer.setStyle(routingStyle);
        renderer.drawGeometry(polygon);
      },
    );
  }
}
