import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLRenderFeature from 'ol/render/Feature';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import OLStyle from 'ol/style/Style';
import { Colour, ColourUtils } from '../../../utils/ColourUtils';
import { AlloyScaleUtils } from './AlloyScaleUtils';

/**
 * utility for creating polygon styles
 * @ignore
 * @internal
 */
export abstract class AlloyPolygonUtils {
  /**
   * creates a polygon style
   * @param colour the colour of the polygon
   * @param opacity the opacity of the polygon
   * @param geometryFunction the optional geometry function for the style
   */
  public static createPolygonStyle(
    colour: Colour,
    opacity = 1,
    geometryFunction?: (olFeature: OLFeature | OLRenderFeature) => OLGeometry,
  ): OLStyle {
    return new OLStyle({
      fill: new OLFill({
        color: ColourUtils.opacity(colour, opacity),
      }),
      geometry: geometryFunction,
      zIndex: 0,
    });
  }

  /**
   * creates a polygon halo style
   * @param colour the colour of the polygon
   * @param opacity the opacity of the polygon
   * @param geometryFunction the optional geometry function for the style
   */
  public static createPolygonHaloStyle(
    colour: Colour,
    opacity = 1,
    geometryFunction?: (olFeature: OLFeature | OLRenderFeature) => OLGeometry,
  ): OLStyle {
    return new OLStyle({
      stroke: new OLStroke({
        color: ColourUtils.opacity(ColourUtils.lightenHalo(colour), opacity),
        width: AlloyScaleUtils.LINE_WIDTH_MAX,
        lineJoin: 'miter',
      }),
      geometry: geometryFunction,
      zIndex: 0,
    });
  }
}
