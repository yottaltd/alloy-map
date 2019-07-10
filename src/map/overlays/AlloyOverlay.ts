import OLOverlay from 'ol/Overlay';

/**
 * an alloy overlay which can add native html elements to the map
 */
export interface AlloyOverlay {
  /**
   * unique identifier for the overlay
   */
  readonly id: string;

  /**
   * the openlayers overlay to add to the map
   * @ignore
   * @internal
   */
  readonly olOverlay: OLOverlay;
}
