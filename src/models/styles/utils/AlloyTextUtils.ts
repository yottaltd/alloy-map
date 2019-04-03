import * as _ from 'lodash';

/**
 * the size in pixels of the canvas to render text on
 * @ignore
 */
const TEXT_CANVAS_SIZE: number = 256;

/**
 * the font string used to render on the canvas
 * @param fontSize the font size to inject into the font string
 * @ignore
 */
const TEXT_FONT = (fontSize: number) =>
  `700 ${fontSize}px/${TEXT_CANVAS_SIZE}px Open Sans, Arial, sans-serif`;

/**
 * utility for rendering text
 * @ignore
 */
export abstract class AlloyTextUtils {
  /**
   * creates a text canvas for a the provided text, the canvas size is `TEXT_CANVAS_SIZE`
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
    // create a canvas to work on
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = TEXT_CANVAS_SIZE;
    canvas.height = TEXT_CANVAS_SIZE;

    // clean the text input
    text = AlloyTextUtils.cleanText(text);

    // if we don't have any text then fail silently
    if (!text) {
      return canvas;
    }

    const context = canvas.getContext('2d')! /* cannot be null in the year 2019 */;
    context.fillStyle = colour;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // now work out the text width for the default font size
    let fontSize: number = TEXT_CANVAS_SIZE;
    context.font = TEXT_FONT(fontSize);
    let metrics: TextMetrics = context.measureText(text);

    // if its too big then scale it down to what "should" exactly equal the width
    if (metrics.width > TEXT_CANVAS_SIZE) {
      fontSize *= TEXT_CANVAS_SIZE / metrics.width;
      context.font = TEXT_FONT(fontSize); // update the font
      metrics = context.measureText(text);
    }

    // work out if we need to "shift" the positioning of the text vertically to match the visual
    // centre as it doesn't quite work. this number is bulls**t but it seems to work until
    // all browsers implement TextMetrics properly
    const offsetY = fontSize * 0.1;

    context.fillText(text, TEXT_CANVAS_SIZE / 2, TEXT_CANVAS_SIZE / 2 + offsetY);
    return canvas;
  }
}
