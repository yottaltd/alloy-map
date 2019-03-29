import { AlloyCoordinate } from '../core/AlloyCoordinate';

/**
 * event fired when the map centre is changed
 * @event
 */
export class MapChangeCentreEvent {
  /**
   * the centre coordinate of the map
   */
  public readonly centre: AlloyCoordinate;

  /**
   * the current map extents
   * @ignore
   */
  public readonly olExtent: [number, number, number, number];

  /**
   * the current map resolution
   * @ignore
   */
  public readonly olResolution: number;

  /**
   * creates a new event instance
   * @param centre the centre of the map
   * @param olResolution the resolution of the map
   * @param olExtent the map view extents
   */
  constructor(
    centre: AlloyCoordinate,
    olResolution: number,
    olExtent: [number, number, number, number],
  ) {
    this.centre = centre;
    this.olResolution = olResolution;
    this.olExtent = olExtent;
  }
}
