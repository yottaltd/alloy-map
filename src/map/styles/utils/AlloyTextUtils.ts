import * as _ from 'lodash';

/**
 * the canvas min size, width is always a multiple of this whilst height is always exactly this
 * @ignore
 */
const CANVAS_SIZE = 50;

/**
 * the font and size to use when rendering, we use a fixed size because using floating point
 * font sizes results in very bad scaling
 * @ignore
 */
const TEXT_FONT = '700 18px/50px Open Sans, Arial, sans-serif';

/**
 * utility for rendering text
 * @ignore
 * @internal
 */
export abstract class AlloyTextUtils {
  /**
   * creates a text canvas for a the provided text, the size is `c*50,50` where `c = no. of chars`
   * @param text the text to write on the canvas
   * @param colour the colour of the text
   */
  public static createTextCanvas(text: string, colour: string): HTMLCanvasElement {
    return AlloyTextUtils.memoizedCreateTextCanvas(text, colour);
  }

  /**
   * the memoized version of `createTextCanvasImplementation`
   */
  private static readonly memoizedCreateTextCanvas = _.memoize(
    AlloyTextUtils.createTextCanvasImplementation,
    // custom resolver because lodash only keys on the first argument
    (text: string, colour: string) => AlloyTextUtils.cleanText(text) + ':' + colour,
  );

  /**
   * cleans the text ready for presentation
   * @param text the text to clean
   */
  private static cleanText(text: string): string {
    return text.replace(/ /g, '').toUpperCase();
  }

  /**
   * implementation of create text canvas
   * @param text the text to write on the canvas
   * @param colour the colour of the text
   */
  private static createTextCanvasImplementation(text: string, colour: string): HTMLCanvasElement {
    // clean the text input
    text = AlloyTextUtils.cleanText(text);

    // create a canvas to work on
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.height = CANVAS_SIZE;
    canvas.width = Math.max(CANVAS_SIZE, text.length * CANVAS_SIZE);

    // if we don't have any text then fail silently
    if (!text) {
      return canvas;
    }

    const context = canvas.getContext('2d')! /* cannot be null in the year 2019 */;
    context.fillStyle = colour;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = TEXT_FONT;
    context.fillText(
      text,
      canvas.width / 2,
      CANVAS_SIZE / 2 +
        Math.floor(CANVAS_SIZE * 0.05) /* 5% of the overall height to nudge it down */,
    );
    return canvas;
  }
}
