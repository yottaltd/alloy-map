import { AlloyMapError } from '../../error/AlloyMapError';

/**
 * regex for testing a colour is valid hex
 * @ignore
 */
const HEX_REGEX = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

/**
 * an alloy layer style informs an alloy layer about how to style its contents
 */
export class AlloyLayerStyle {
  /**
   * the styles unique id
   */
  public readonly styleId: string;

  /**
   * the colour of the layer style in hex
   */
  public readonly colour: string;

  /**
   * the icon of the style, should be a font class name
   */
  public readonly icon: string;

  /**
   * creates a new instance
   * @param styleId the style id
   * @param colour the colour of the style
   * @param icon the icon font class name
   */
  constructor(styleId: string, colour: string, icon: string) {
    this.styleId = styleId;
    this.icon = icon;

    // we're really picky about colours being hex to avoid issues in openlayers
    if (!HEX_REGEX.test(colour)) {
      throw new AlloyMapError(1554164853, 'colour for layer style was not valid hex');
    }
    // lowercase because we use this value as a cache key e.g. #ccc === #CCC
    this.colour = colour.toLowerCase();
  }
}