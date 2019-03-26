/**
 * event fired when the map zoom level is changed
 * @event
 */
export class MapChangeZoomEvent {
  public readonly zoom: number;

  /**
   * creates a new event instance
   * @param zoom the zoom level of the map
   */
  constructor(zoom: number) {
    this.zoom = zoom;
  }
}
