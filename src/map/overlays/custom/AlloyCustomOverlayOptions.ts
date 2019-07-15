import { AlloyCoordinate } from '../../core/AlloyCoordinate';
import { AlloyOverlayPositioning } from '../AlloyOverlayPositioning';

/**
 * the options for an alloy custom overlay
 */
export interface AlloyCustomOverlayOptions {
  /**
   * the id of the custom overlay, should be unique
   */
  readonly id: string;

  /**
   * the element to add to the map
   */
  readonly element: HTMLElement;

  /**
   * the offset in pixels for the element from the position
   */
  readonly offset?: [number, number];

  /**
   * the coordinate on the map to place the element or if undefined it wont be displayed
   */
  readonly position?: AlloyCoordinate;

  /**
   * the positioning of the element relative to the position
   */
  readonly positioning: AlloyOverlayPositioning;
}
