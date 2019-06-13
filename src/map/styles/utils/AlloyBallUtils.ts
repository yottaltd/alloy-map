import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLRenderFeature from 'ol/render/Feature';
import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { ColourUtils } from '../../../utils/ColourUtils';

/**
 * utility for ball styles
 * @ignore
 * @internal
 */
export abstract class AlloyBallUtils {
  /**
   * creates a ball style
   * @param radius the radius of the ball
   * @param colour the colour of the ball
   * @param geometryFunction the optional geometry function for the style
   */
  public static createBallStyle(
    radius: number,
    colour: string,
    geometryFunction?: (olFeature: OLFeature | OLRenderFeature) => OLGeometry,
  ): OLStyle {
    return new OLStyle({
      image: new OLCircle({
        radius,
        fill: new OLFill({
          color: colour,
        }),
        stroke: new OLStroke({
          width: 1,
          color: ColourUtils.darkenBorder(colour),
        }),
      }),
      geometry: geometryFunction,
      zIndex: 0,
    });
  }

  /**
   * creates a ball halo style
   * @param radius the radius of ball to add a halo around (the value will be modified by a standard
   *               multiplier)
   * @param colour the colour of the ball
   * @param geometryFunction the optional geometry function for the style
   */
  public static createBallHaloStyle(
    radius: number,
    colour: string,
    geometryFunction?: (olFeature: OLFeature | OLRenderFeature) => OLGeometry,
  ): OLStyle {
    return new OLStyle({
      image: new OLCircle({
        radius: radius * 1.33,
        fill: new OLFill({
          color: ColourUtils.lightenHalo(colour),
        }),
      }),
      geometry: geometryFunction,
      zIndex: 0,
    });
  }
}
