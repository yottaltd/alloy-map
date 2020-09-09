import { AlloyMapError } from '../../error/AlloyMapError';

/**
 * regex for testing a colour is valid hex
 * @ignore
 */
const HEX_REGEX = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

/**
 * an alloy heatmap layer style informs an alloy layer about how to style its contents
 */
export class AlloyHeatmapLayerStyle {
  /**
   * the styles unique id
   */
  public readonly styleId: string;

  /**
   * the property to use for weight calculation
   */
  public readonly weightProperty: string;

  /**
   * the gradient colours of the layer style in hex
   */
  public readonly gradient?: string[];

  /**
   * radius of the style
   */
  public readonly radius?: number;

  /**
   * blur of the style
   */
  public readonly blur?: number;

  /**
   * creates a new instance
   * @param styleId the style id
   * @param weightProperty the property to use for weight calculation
   * @param gardient colours array to use for heatmap styling
   * @param blur value in pixels that's used for bluring heatmap
   * @param radius value in pixels that's used for styling heatmap points
   */
  constructor(
    styleId: string,
    weightProperty: string,
    gradient?: string[],
    blur?: number,
    radius?: number,
  ) {
    this.styleId = styleId;
    this.weightProperty = weightProperty;
    this.blur = blur;
    this.radius = radius;

    if (gradient) {
      // we're really picky about colours being hex to avoid issues in openlayers
      gradient.forEach((colour) => {
        if (!HEX_REGEX.test(colour)) {
          throw new AlloyMapError(1554164853, 'colour for layer style was not valid hex');
        }
      });
      this.gradient = gradient.map((colour) => colour.toLowerCase());
    }
  }
}
