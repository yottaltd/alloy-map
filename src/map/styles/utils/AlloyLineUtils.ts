import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLRenderFeature from 'ol/render/Feature';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { ColourUtils } from '../../../utils/ColourUtils';

/**
 * utility for line style
 * @ignore
 */
export abstract class AlloyLineUtils {
  /**
   * creates a line style
   * @param width the width of the line
   * @param colour the colour of the line
   * @param geometryFunction the optional geometry function for the style
   */
  public static createLineStyle(
    width: number,
    colour: string,
    geometryFunction?: (olFeature: OLFeature | OLRenderFeature) => OLGeometry,
  ): OLStyle {
    return new OLStyle({
      stroke: new OLStroke({
        width,
        color: colour,
        lineCap: 'round',
        lineJoin: 'round',
      }),
      geometry: geometryFunction,
    });
  }

  /**
   * creates a line halo style
   * @param width the width of line to add a halo around (the value will be modified by a standard
   *               multiplier)
   * @param colour the colour of the line
   * @param geometryFunction the optional geometry function for the style
   */
  public static createLineHaloStyle(
    width: number,
    colour: string,
    geometryFunction?: (olFeature: OLFeature | OLRenderFeature) => OLGeometry,
  ): OLStyle {
    return new OLStyle({
      stroke: new OLStroke({
        width: width * 2,
        color: ColourUtils.lightenHalo(colour),
        lineCap: 'round',
        lineJoin: 'round',
      }),
      geometry: geometryFunction,
    });
  }
}
