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
   * generates a halo colour which is a lightened and transparent version of the provided colour
   * @param colour the colour to generate the halo colour for
   */
  public static lightenHalo(colour: string): [number, number, number, number] {
    const lightened = color(colour).lighten(LIGHTEN_AMOUNT);
    return [lightened.red(), lightened.green(), lightened.blue(), 0.5];
  }
}
