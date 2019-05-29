import { AlloyCoordinate } from '../core/AlloyCoordinate';

/**
 * event fired when the map centre is changed
 * @event
 */
export class MapChangeCentreEvent {
  /**
   * the current map resolution
   * @ignore
   * @internal
   */
  public readonly olResolution: number;

  /**
   * the centre coordinate of the map
   */
  private readonly originalCentre: AlloyCoordinate;

  /**
   * the current map extents
   */
  private readonly originalOlExtent: [number, number, number, number];

  /**
   * creates a new event instance
   * @param centre the centre of the map
   * @param olResolution the resolution of the map
   * @param olExtent the map view extents
   * @ignore
   * @internal
   */
  constructor(
    centre: AlloyCoordinate,
    olResolution: number,
    olExtent: [number, number, number, number],
  ) {
    this.originalCentre = centre;
    this.olResolution = olResolution;
    this.originalOlExtent = olExtent;
  }

  /**
   * gets the centre coordinate of the map
   */
  public get centre(): AlloyCoordinate {
    return this.originalCentre.clone();
  }

  /**
   * the current map extents
   * @ignore
   * @internal
   */
  public get olExtent(): [number, number, number, number] {
    return this.originalOlExtent.slice(0) as /* cast as ts dont like */ [
      number,
      number,
      number,
      number
    ];
  }
}
