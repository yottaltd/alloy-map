import * as color from 'color';

/**
 * consistent percentage when modifying colours
 * @ignore
 */
const DARKEN_LIGHTEN_AMOUNT = 0.08;

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
      .darken(DARKEN_LIGHTEN_AMOUNT)
      .hex();
  }
}
