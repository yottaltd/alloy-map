import color from 'color';

/**
 * consistent percentage when modifying colours
 * @ignore
 */
const DARKEN_AMOUNT = 0.08;

/**
 * consistent percentage when modifying colours
 * @ignore
 */
const LIGHTEN_AMOUNT = 0.16;

/**
 * Wrapper for colour representation, either a string or number array in [r,g,b,a] format
 */
export type Colour = string | [number, number, number, number];
/**
 * utility for colours
 * @ignore
 * @internal
 */
export abstract class ColourUtils {
  /**
   * consistent darkening of a colour for borders
   * @param colour the colour to darken
   */
  public static darkenBorder(colour: Colour): string {
    return color(colour)
      .darken(DARKEN_AMOUNT)
      .hex();
  }

  /**
   * consistent darkening of a colour for labels
   * @param colour the colour to darken
   */
  public static darkenLabel(colour: string): string {
    return color(colour)
      .darken(DARKEN_AMOUNT * 2)
      .hex();
  }

  /**
   * consistent lightening of a colour for backgrounds
   * @param colour the colour to lighten
   */
  public static lightenBackground(colour: Colour): string {
    return color(colour)
      .lighten(LIGHTEN_AMOUNT)
      .hex();
  }

  /**
   * consistent semi transparent colours for things like polygons
   * @param colour
   */
  public static semiTransparent(colour: Colour): [number, number, number, number] {
    return ColourUtils.opacity(colour, 0.33);
  }

  /**
   * generates a halo colour which is a lightened and transparent version of the provided colour
   * @param colour the colour to generate the halo colour for
   */
  public static lightenHalo(colour: Colour): [number, number, number, number] {
    const rgb = color(colour)
      .lighten(LIGHTEN_AMOUNT)
      .fade(0.5);
    return [rgb.red(), rgb.green(), rgb.blue(), rgb.alpha()];
  }

  /**
   * sets the opacity on a colour
   * @param colour the colour to set the opacity value for
   * @param opacity the opacity 0-1
   */
  public static opacity(colour: Colour, opacity: number): [number, number, number, number] {
    const rgb = color(colour).fade(1 - opacity);
    return [rgb.red(), rgb.green(), rgb.blue(), rgb.alpha()];
  }

  public static toString(colour: Colour): string {
    if (typeof colour === 'string') {
      return colour;
    }
    return `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${colour[3]});`;
  }
}
