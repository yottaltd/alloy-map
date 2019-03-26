import { AlloyCoordinate } from '../core/AlloyCoordinate';

/**
 * event fired when the map centre is changed
 * @event
 */
export class MapChangeCentreEvent {
  public readonly centre: AlloyCoordinate;

  /**
   * creates a new event instance
   * @param centre the centre of the map
   */
  constructor(centre: AlloyCoordinate) {
    this.centre = centre;
  }
}
