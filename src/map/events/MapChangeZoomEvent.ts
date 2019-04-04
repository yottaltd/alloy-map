/**
 * event fired when the map zoom level is changed
 * @event
 */
export class MapChangeZoomEvent {
  /**
   * the zoom level of the map
   */
  public readonly zoom: number;

  /**
   * the current map resolution
   * @ignore
   */
  public readonly olResolution: number;

  /**
   * creates a new event instance
   * @param zoom the zoom level of the map
   * @param olResolution the current map resolution
   */
  constructor(zoom: number, olResolution: number) {
    this.zoom = zoom;
    this.olResolution = olResolution;
  }
}
