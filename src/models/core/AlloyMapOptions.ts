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
   * the starting centre location for the map
   */
  centre?: AlloyCoordinate;

  /**
   * the starting zoom level for the map
   */
  zoom?: number;
}
