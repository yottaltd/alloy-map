import OLCircle from 'ol/style/Circle';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { ColourUtils } from '../../../utils/ColourUtils';

/**
 * utility for ball styles
 * @ignore
 */
export abstract class AlloyBallUtils {
  /**
   * creates a ball style
   * @param radius the radius of the ball
   * @param colour the colour of the ball
   */
  public static createBallStyle(radius: number, colour: string): OLStyle {
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
    });
  }

  /**
   * creates a ball halo style
   * @param radius the radius of ball to add a halo around (the value will be modified by a standard
   *               multiplier)
   * @param colour the colour of the ball
   */
  public static createBallHaloStyle(radius: number, colour: string): OLStyle {
    return new OLStyle({
      image: new OLCircle({
        radius: radius * 1.33,
        fill: new OLFill({
          color: ColourUtils.lightenHalo(colour),
        }),
      }),
    });
  }
}
