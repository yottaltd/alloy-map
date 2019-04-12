import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLRenderFeature from 'ol/render/Feature';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import OLFill from 'ol/style/Fill';
import OLCircle from 'ol/style/Circle';
import { ColourUtils } from '../../../utils/ColourUtils';
import { AlloyLineStringFunctions } from './geometry-functions/AlloyLineStringFunctions';

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
  /**
   * creates a line dash style
   * @param width the width of line to calculate line dash size and spacing
   * @param colour the colour of the line
   * @param geometryFunction the optional geometry function for the style
   */
  public static createLineDashStyle(
    width: number,
    colour: string,
    geometryFunction?: (olFeature: OLFeature | OLRenderFeature) => OLGeometry,
  ): OLStyle {
    return new OLStyle({
      stroke: new OLStroke({
        color: colour,
        width: Math.floor(width) < 30 ? Math.min(width / 6, 4) : 5,
        lineDash: [width, width],
        lineCap: 'square',
      }),
      geometry: geometryFunction,
    });
  }
  /**
   * creates a line end style
   * @param width the width of line to calculate line end points radius
   * @param colour the colour of the line
   * @param geometryFunction the optional geometry function for the style
   */
  public static createLineEndStyle(
    width: number,
    colour: string,
    geometryFunction?: (olFeature: OLFeature | OLRenderFeature) => OLGeometry,
  ): OLStyle {
    return new OLStyle({
      image: new OLCircle({
        radius: width / 3,
        fill: new OLFill({ color: colour }),
      }),
      geometry: geometryFunction,
    });
  }
}
