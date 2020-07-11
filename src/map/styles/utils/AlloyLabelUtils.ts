import * as _ from 'lodash';
import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLRenderFeature from 'ol/render/Feature';
import OLIcon from 'ol/style/Icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import OLStyle from 'ol/style/Style';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { ColourUtils } from '../../../utils/ColourUtils';
import { AlloyLayerStyleScale } from '../AlloyLayerStyleScale';

/**
 * The size in pixels of the rendered label canvas
 * @ignore
 */
const LABEL_CANVAS_HEIGHT = 30;

/**
 * The size in pixels of the rendered arrow width
 * @ignore
 */
const LABEL_ARROW_WIDTH = 15;

/**
 * The size in pixels of the padding to apply between the label text and the arrow
 * (could be left or right)
 * @ignore
 */
const LABEL_TEXT_PADDING_LEADING = 4.5;

/**
 * The size in pixels of the padding to apply after the label text (could be left or right)
 * @ignore
 */
const LABEL_TEXT_PADDING_TRAILING = 9;

/**
 * the font and size to use when rendering a title on it's own, we use a fixed size because using
 * floating point font sizes results in very bad scaling
 * @ignore
 */
const LABEL_TITLE_ONLY_FONT = '700 12px/30px Open Sans, Arial, sans-serif';

/**
 * the line height of the title (when in title and subtitle mode)
 * @ignore
 */
const LABEL_TITLE_LINE_HEIGHT = 11;

/**
 * the font and size to use when rendering a title combined with a subtitle, we use a fixed size
 * because using floating point font sizes results in very bad scaling
 * @ignore
 */
const LABEL_TITLE_FONT = `700 10px/${LABEL_TITLE_LINE_HEIGHT}px Open Sans, Arial, sans-serif`;

/**
 * the line height of the subtitle
 * @ignore
 */
const LABEL_SUBTITLE_LINE_HEIGHT = 11;

/**
 * the font and size to use when rendering a subtitle combined with a title, we use a fixed size
 * because using floating point font sizes results in very bad scaling
 * @ignore
 */
const LABEL_SUBTITLE_FONT = `400 10px/${LABEL_SUBTITLE_LINE_HEIGHT}px Open Sans, Arial, sans-serif`;

/**
 * the maximum length of label title or subtitle
 * @ignore
 */
const LABEL_MAX_LENGTH = 32;

/**
 * the offset in pixels of the arrow from the centre point
 * @ignore
 */
const LABEL_ARROW_OFFSET = -17.5;

/**
 * utility for labels being rendered
 * @ignore
 * @internal
 */
export abstract class AlloyLabelUtils {
  /**
   * creates a label style using the cached label canvas functions
   * @param title the title of the label
   * @param subtitle the optional subtitle of the label
   * @param backgroundColour the background colour of the label
   * @param scale the scale of layer style to position label correctly
   * @param geometryFunction the geometry or function to transform the feature geometry
   */
  public static createLabelStyle(
    title: string | undefined,
    subtitle: string | null | undefined,
    backgroundColour: string,
    scale: AlloyLayerStyleScale,
    geometryFunction?: OLGeometry | ((olFeature: OLFeature | OLRenderFeature) => OLGeometry),
  ): OLStyle | null {
    if (!title && !subtitle) {
      return null;
    }

    // get or generate the canvas for this label
    const canvas = AlloyLabelUtils.createLabelCanvas(
      title ?? null,
      subtitle ?? null,
      backgroundColour,
    );

    // create a custom style to support it
    return new OLStyle({
      image: new OLIcon({
        img: canvas,
        scale: 1, // no scaling, artefacts!
        imgSize: [canvas.width, canvas.height],
        // x should be pixels because we need to offset by a consistent value
        anchorXUnits: IconAnchorUnits.PIXELS,
        // y value is a fraction as we want it centred
        anchorYUnits: IconAnchorUnits.FRACTION,
        // offset the label to the right of its destination
        anchor: [LABEL_ARROW_OFFSET * Math.pow(scale, 2), 0.5],
      }),
      geometry: geometryFunction,
      zIndex: 0,
    });
  }

  /**
   * creates a label canvas for a text string, the canvas height is `LABEL_CANVAS_HEIGHT` the width
   * is dynamic based on the text content,
   * **this method is cached**
   * @param title the title to display in the label
   * @param subtitle the subtitle to display in the label
   * @param backgroundColour the colour of the background
   */
  public static createLabelCanvas(
    title: string | null,
    subtitle: string | null,
    backgroundColour: string,
  ): HTMLCanvasElement {
    return AlloyLabelUtils.memoizedCreateLabelCanvasImplementation(
      title,
      subtitle,
      backgroundColour,
    );
  }

  /**
   * the memoized version of `createLabelCanvasImplementation`
   */
  private static readonly memoizedCreateLabelCanvasImplementation = _.memoize(
    AlloyLabelUtils.createLabelCanvasImplementation,
    // custom resolver because lodash only keys on the first argument
    (title: string | null, subtitle: string | null, backgroundColour: string) =>
      (title ? AlloyLabelUtils.memoizedCleanText(title) : null) +
      ':' +
      (subtitle ? AlloyLabelUtils.memoizedCleanText(subtitle) : null) +
      ':' +
      backgroundColour,
  );

  /**
   * the memoized version of `cleanText`
   */
  private static readonly memoizedCleanText = _.memoize(AlloyLabelUtils.cleanText);

  /**
   * implementation of the create label canvas
   * @param title the title to display
   * @param subtitle the optional subtitle to display
   * @param backgroundColour the background colour of the label
   */
  private static createLabelCanvasImplementation(
    title: string | null,
    subtitle: string | null,
    backgroundColour: string,
  ): HTMLCanvasElement {
    title = title ? AlloyLabelUtils.memoizedCleanText(title) : null;
    subtitle = subtitle ? AlloyLabelUtils.memoizedCleanText(subtitle) : null;

    // create a canvas to work on
    const canvas = document.createElement('canvas');
    canvas.width = LABEL_CANVAS_HEIGHT;
    canvas.height = LABEL_CANVAS_HEIGHT;

    // return empty canvas if we have no text
    const hasTitle = title !== null && title.length > 0;
    const hasSubtitle = subtitle !== null && subtitle.length > 0;
    if (!hasTitle && !hasSubtitle) {
      return canvas;
    }

    const context = canvas.getContext('2d');
    if (context === null) {
      throw new AlloyMapError(1583862146, 'Could not get canvas context');
    }

    // calculate the width of the label based on text
    if (hasTitle && hasSubtitle) {
      // if we have a title and subtitle we need to find the biggest out of title/subtitle
      canvas.width = AlloyLabelUtils.getCanvasWidthWithTitleAndSubtitle(
        context,
        title || '',
        subtitle || '',
      );
    } else if (hasTitle) {
      // otherwise only display title
      canvas.width = AlloyLabelUtils.getCanvasWidthWithTitle(context, title || '');
    }

    // draw the label background shape
    context.beginPath();
    context.moveTo(0, LABEL_CANVAS_HEIGHT / 2);
    context.lineTo(LABEL_ARROW_WIDTH, LABEL_CANVAS_HEIGHT);
    context.lineTo(canvas.width, LABEL_CANVAS_HEIGHT);
    context.lineTo(canvas.width, 0);
    context.lineTo(LABEL_ARROW_WIDTH, 0);
    context.closePath();

    // render the line and background
    context.fillStyle = ColourUtils.darkenLabel(backgroundColour);
    context.strokeStyle = ColourUtils.darkenBorder(context.fillStyle);
    context.lineWidth = 1;
    context.fill();
    context.stroke();

    // clear the style and render the text
    if (hasTitle && hasSubtitle) {
      // if we have a title and subtitle we need to position differently
      AlloyLabelUtils.drawTitleAndSubtitle(context, title || '', subtitle || '');
    } else if (hasTitle) {
      // otherwise only display title
      AlloyLabelUtils.drawTitle(context, title || '');
    }

    return canvas;
  }

  /**
   * draws just the title over the label
   * @param context the canvas context to draw with
   * @param title the title text to show
   */
  private static drawTitle(context: CanvasRenderingContext2D, title: string) {
    context.beginPath();
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.font = LABEL_TITLE_ONLY_FONT;
    context.fillStyle = '#ffffff';
    context.fillText(
      title,
      // offset x by width of arrow and leading padding
      LABEL_ARROW_WIDTH + LABEL_TEXT_PADDING_LEADING,
      // vertically position centrally for just title
      LABEL_CANVAS_HEIGHT / 2 + Math.floor(LABEL_CANVAS_HEIGHT * 0.05),
    );
  }

  /**
   * draws the title and subtitle over the label
   * @param context the canvas context to draw with
   * @param title the title text to show
   * @param subtitle the subtitle text to show
   */
  private static drawTitleAndSubtitle(
    context: CanvasRenderingContext2D,
    title: string,
    subtitle: string,
  ) {
    // draw the title
    context.beginPath();
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.font = LABEL_TITLE_FONT;
    context.fillStyle = '#ffffff';
    context.fillText(
      title,
      // offset x by width of arrow and leading padding
      LABEL_ARROW_WIDTH + LABEL_TEXT_PADDING_LEADING,
      // position the text centrally then subtract half the line height so it appears above the
      // centreline, baseline is middle so we want half the line height
      LABEL_CANVAS_HEIGHT / 2 -
        LABEL_TITLE_LINE_HEIGHT / 2 +
        Math.floor(LABEL_CANVAS_HEIGHT * 0.05) /* 5% of the overall height to nudge it down */,
    );

    // draw the subtitle
    context.beginPath();
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.font = LABEL_SUBTITLE_FONT;
    context.fillStyle = '#ffffff';
    context.fillText(
      subtitle,
      // offset x by width of arrow and leading padding
      LABEL_ARROW_WIDTH + LABEL_TEXT_PADDING_LEADING,
      // position the text centrally then add half the line height so it appears below the
      // centreline, baseline is middle so we want half the line height
      LABEL_CANVAS_HEIGHT / 2 +
        LABEL_SUBTITLE_LINE_HEIGHT / 2 +
        Math.floor(LABEL_CANVAS_HEIGHT * 0.05),
    );
  }

  /**
   * calculates the required canvas width given title
   * @param context the canvas context to calculate font sizes with
   * @param title the title
   */
  private static getCanvasWidthWithTitle(context: CanvasRenderingContext2D, title: string) {
    // set font to use
    context.font = LABEL_TITLE_ONLY_FONT;

    // calculate font width of title
    const textMetrics = context.measureText(title);

    return (
      // add width of the drawn text
      textMetrics.width +
      // the the leading padding
      LABEL_TEXT_PADDING_LEADING +
      // add the arrow width
      LABEL_ARROW_WIDTH +
      // and the trailing padding
      LABEL_TEXT_PADDING_TRAILING
    );
  }

  /**
   * calculates the required canvas width given title and subtitle
   * @param context the canvas context to calculate font sizes with
   * @param title the title
   * @param subtitle the subtitle
   */
  private static getCanvasWidthWithTitleAndSubtitle(
    context: CanvasRenderingContext2D,
    title: string,
    subtitle: string,
  ) {
    // set font to use
    context.font = LABEL_TITLE_FONT;

    // calculate font width of title
    const titleMetrics = context.measureText(title);

    // set font for subtitle
    context.font = LABEL_SUBTITLE_FONT;

    // calculate substitle width
    const subtitleMetrics = context.measureText(subtitle);

    return (
      // get the larger width from subtitle or title
      Math.max(titleMetrics.width, subtitleMetrics.width) +
      // the the leading padding
      LABEL_TEXT_PADDING_LEADING +
      // add the arrow width
      LABEL_ARROW_WIDTH +
      // add the trailing padding
      LABEL_TEXT_PADDING_TRAILING
    );
  }

  /**
   * cleans the text ready for presentation
   * @param text the text to clean
   */
  private static cleanText(text: string): string {
    let formatted = text.trim().toUpperCase();
    if (formatted.length > LABEL_MAX_LENGTH + 3 /* 3 for ellipsis */) {
      formatted = formatted.slice(0, LABEL_MAX_LENGTH + 1) + '...';
    }
    return formatted;
  }
}
