import * as color from 'color';

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
 * utility for colours
 * @ignore
 * @internal
 */
export abstract class ColourUtils {
  /**
   * consistent darkening of a colour for borders
   * @param colour the colour to darken
   */
  public static darkenBorder(colour: string): string {
    return color(colour)
      .darken(DARKEN_AMOUNT)
      .hex();
  }

  /**
   * consistent lightening of a colour for backgrounds
   * @param colour the colour to lighten
   */
  public static lightenBackground(colour: string): string {
    return color(colour)
      .lighten(LIGHTEN_AMOUNT)
      .hex();
  }

  /**
   * consistent semi transparent colours for things like polygons
   * @param colour
   */
  public static semiTransparent(colour: string): [number, number, number, number] {
    return ColourUtils.opacity(colour, 0.33);
  }

  /**
   * generates a halo colour which is a lightened and transparent version of the provided colour
   * @param colour the colour to generate the halo colour for
   */
  public static lightenHalo(colour: string): [number, number, number, number] {
    const rgb = color(colour).lighten(LIGHTEN_AMOUNT);
    return [rgb.red(), rgb.green(), rgb.blue(), 0.5];
  }

  /**
   * sets the opacity on a colour
   * @param colour the colour to set the opacity value for
   * @param opacity the opacity 0-1
   */
  public static opacity(colour: string, opacity: number): [number, number, number, number] {
    const rgb = color(colour);
    return [rgb.red(), rgb.green(), rgb.blue(), opacity];
  }

  /**
   * Validates that string is a valid full hex colour in the format `{#RRGGBB}`
   * @param colour the hex colour string to validate
   * @returns whether colour is a valid hex
   */
  public static isValidFullHex(colour: string): boolean {
    const regex = /^#([A-Fa-f0-9]{6})$/g.exec(colour);
    return regex !== null && regex.length >= 0;
  }
}
