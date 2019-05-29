import * as webfontloader from 'webfontloader';

/**
 * utility for web fonts
 * @ignore
 * @internal
 */
export abstract class FontUtils {
  /**
   * the alloy icons named font family
   */
  public static readonly FONT_ALLOY_ICONS = 'alloyicons';

  /**
   * the font weight for alloy icons
   */
  public static readonly FONT_WEIGHT_ALLOY_ICONS = 400;

  /**
   * the alloy icons default loader settings
   */
  public static readonly FONT_ALLOY_ICONS_LOADER_SETTINGS = {
    fontFamily: FontUtils.FONT_ALLOY_ICONS + ':n4', // normal style 400 weight
    testString: '\uEC5C', // designer
  };

  /**
   * loads webfonts so they are ready for the rendering pipeline
   * @param webfonts the webfonts to begin loading
   */
  public static load(webfonts: Array<{ fontFamily: string; testString: string }>) {
    // filter out fonts already requested
    webfonts = webfonts.filter((f) => !FontUtils.fonts.has(f.fontFamily));

    // if we have no fonts, then break
    if (webfonts.length === 0) {
      return;
    }

    // generate the test string mapping
    const testStrings = {};
    webfonts.forEach((f) => {
      testStrings[f.fontFamily] = f.testString;

      // mark each family as "loading"
      FontUtils.fonts.set(f.fontFamily, 'loading');
    });

    // start loading the fonts
    webfontloader.load({
      custom: {
        families: webfonts.map((f) => f.fontFamily),
        testStrings,
      },
      // each time a font becomes available, mark it as ready
      fontactive(familyName, fontVariantDescription) {
        FontUtils.fonts.set(familyName, 'ready');
      },
      // each time a font cannot be loaded, mark it as failed
      fontinactive(familyName, fontVariantDescription) {
        FontUtils.fonts.set(familyName, 'failed');
      },
    });
  }

  /**
   * checks if a font family has finished being loaded, ready for rendering
   * @param fontFamily the font family to check has loaded
   */
  public static hasFontFamilyLoaded(fontFamily: string): boolean {
    return FontUtils.fonts.get(fontFamily) === 'ready';
  }

  /**
   * cache of fonts being loaded or have finished, used in the icon pipelines to know when an icon
   * is ready for rendering
   */
  private static readonly fonts = new Map<string, 'loading' | 'ready' | 'failed'>();
}
