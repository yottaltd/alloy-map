import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
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

  /**
   * sets the overlays position or removes it from the map if null
   * @param coordinate the coordinate to set or null
   */
  setPosition(coordinate: AlloyCoordinate | null): void;
}
