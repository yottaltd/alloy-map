import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
import { AlloyMapScaleOptions } from '@/map/core/AlloyMapScaleOptions';

/**
 * options that can be set when initialising an `AlloyMap` instance
 */
export interface AlloyMapOptions {
  /**
   * the dom element to use when rendering the map
   */
  element: HTMLElement;

  /**
   * the basepath of the alloy api to make tile requests to e.g. https://api.labs.alloyapp.io/
   */
  api: string;

  /**
   * the authentication token to use for api requests
   */
  token: string;

  /**
   * the starting centre location for the map
   */
  centre?: AlloyCoordinate;

  /**
   * the starting zoom level for the map
   */
  zoom?: number;

  /**
   * whether the map can be interacted with, defaults to true
   */
  interactive?: boolean;

  /**
   * whether basemap attributions should be displayed on the map, defaults to true
   */
  attributions?: boolean;

  /**
   * map scale position options, if not provided then scale will not be displayed
   */
  scale?: AlloyMapScaleOptions;

  /**
   * the webfont family names to load into the map. "alloyicons" are attempted to be loaded by
   * default
   */
  webfonts?: Array<{
    /**
     * the font family name to load e.g. "Font Awesome 5 Free" you should also provide the FVD value
     * https://github.com/typekit/fvd e.g. "Font Awesome 5 Free:n9" when the font doesn't use
     * normal style and 400/normal weight
     */
    fontFamily: string;

    /**
     * the test string to check the font family is loaded, e.g. fontawesome might be '\uf2fe`
     */
    testString: string;
  }>;
}
