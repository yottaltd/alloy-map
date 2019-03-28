import { AlloyCoordinate } from './AlloyCoordinate';

/**
 * options that can be set when initialising an `AlloyMap` instance
 */
export interface AlloyMapOptions {
  /**
   * the dom element to use when rendering the map
   */
  element: Element;

  /**
   * the basepath of the alloy api to make tile requests to e.g. https://api.labs.alloyapp.io/api
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
}
