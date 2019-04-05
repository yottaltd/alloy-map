import * as _ from 'lodash';
import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLRenderFeature from 'ol/render/Feature';
import OLIcon from 'ol/style/Icon';
import OLStyle from 'ol/style/Style';
import { FontUtils } from '../../../utils/FontUtils';

/**
 * the size in pixels of the canvas to render icons on
 * @ignore
 */
const ICON_CANVAS_SIZE = 256;

/**
 * utility for icons being rendered
 * @ignore
 */
export abstract class AlloyIconUtils {
  /**
   * gets the unicode value for a font class (or classes), **this method is cached**
   * @param classNames the class name or names (space separated) to generate the unicode for
   */
  public static readonly getUnicodeForFontClass = _.memoize(
    AlloyIconUtils.getUnicodeForFontClassImplementation,
  );

  /**
   * creates an alloy icon style, specifically for Alloy Icons, if you want custom icons use the
   * constituent parts of this function separately!
   * @param size the size of the icon
   * @param alloyIconClass the alloy icon class e.g. icon-stl
   * @param colour the colour of the icon
   */
  public static createAlloyIconStyle(
    size: number,
    alloyIconClass: string,
    colour: string,
    geometryFunction?: (olFeature: OLFeature | OLRenderFeature) => OLGeometry,
  ): OLStyle {
    // generate the icon canvas
    const iconCanvas = AlloyIconUtils.createIconCanvas(
      alloyIconClass,
      colour,
      FontUtils.FONT_ALLOY_ICONS,
      FontUtils.FONT_WEIGHT_ALLOY_ICONS,
    );

    return new OLStyle({
      image: new OLIcon({
        img: iconCanvas,
        snapToPixel: false,
        scale: size / iconCanvas.width,
        imgSize: [iconCanvas.width, iconCanvas.height],
      }),
      geometry: geometryFunction,
    });
  }

  /**
   * creates an icon canvas for a unicode icon value, the canvas size is `ICON_CANVAS_SIZE`,
   * **this method is cached**
   * @param classNames the classname (or space separated names) of the icon
   * @param colour the colour of the icon
   * @param font the font to use
   * @param fontWeight the font weight to use
   */
  public static createIconCanvas(
    classNames: string,
    colour: string,
    font: string,
    fontWeight: number,
  ): HTMLCanvasElement {
    return AlloyIconUtils.memoizedCreateIconCanvas(classNames, colour, font, fontWeight);
  }

  /**
   * memoized version of `createIconCanvasImplementation`
   */
  private static readonly memoizedCreateIconCanvas = _.memoize(
    AlloyIconUtils.createIconCanvasImplementation,
    // custom resolver because lodash only keys on the first argument
    (classNames: string, colour: string, font: string, fontWeight: number) =>
      classNames +
      ':' +
      colour +
      ':' +
      font +
      ':' +
      // we include the state of the font being loaded because it can be stale e.g. empty canvas
      // vs loaded showing an actual icon
      FontUtils.hasFontFamilyLoaded(font) +
      ':' +
      fontWeight,
  );

  /**
   * implementation of create icon canvas
   * @param classNames the classname (or space separated names) of the icon
   * @param colour the colour of the icon
   * @param font the font to use
   * @param fontWeight the font weight to use
   */
  private static createIconCanvasImplementation(
    classNames: string,
    colour: string,
    font: string,
    fontWeight: number,
  ): HTMLCanvasElement {
    // create a canvas to work on
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = ICON_CANVAS_SIZE;
    canvas.height = ICON_CANVAS_SIZE;

    // if the font hasn't loaded yet, then return the blank canvas
    if (!FontUtils.hasFontFamilyLoaded(font)) {
      return canvas;
    }

    // get the unicode value of the icon
    const unicode = AlloyIconUtils.getUnicodeForFontClass(classNames);

    // if we don't have an icon then fail silently
    if (unicode === null) {
      return canvas;
    }

    const context = canvas.getContext('2d')! /* cannot be null in the year 2019 */;
    context.fillStyle = colour;
    // set the font to use, font-weight must be valid for the font, the 256px/256px syntax is
    // fontSize/lineHeight to ensure we are vertically positioning
    context.font = `${fontWeight} ${ICON_CANVAS_SIZE}px/${ICON_CANVAS_SIZE}px "${font}"`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(unicode, ICON_CANVAS_SIZE / 2, ICON_CANVAS_SIZE / 2);
    return canvas;
  }

  /**
   * implementation of the get unicode value for font class
   * @param classNames the class name or names (space separated) to generate the unicode for
   */
  private static getUnicodeForFontClassImplementation(classNames: string): string | null {
    // creates an element to test the class names on
    const element = document.createElement('i');
    element.classList.add('icon'); // always add icon, even if not using an alloy font
    classNames.split(' ').forEach((part) => element.classList.add(part));
    element.style.display = 'none';
    document.body.appendChild(element);

    // calculate the style of the font class
    const beforeContent = window.getComputedStyle(element, ':before').content;
    if (!beforeContent) {
      return null;
    }

    // remove the test element
    element.remove();

    // get the char code
    return beforeContent.replace(/'|"/g, '');
  }
}
