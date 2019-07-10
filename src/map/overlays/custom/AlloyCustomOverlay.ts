import { AlloyOverlay } from '../AlloyOverlay';
import { AlloyCustomOverlayOptions } from './AlloyCustomOverlayOptions';
import OLOverlay from 'ol/Overlay';

/**
 * an alloy custom overlay allows us to put html elements on top of the map
 */
export class AlloyCustomOverlay implements AlloyOverlay {
  /**
   * the id of the custom overlay
   * @implements
   */
  public readonly id: string;

  /**
   * the openlayers overlay to add to the map
   * @ignore
   * @internal
   * @implements
   */
  public readonly olOverlay: OLOverlay;

  /**
   * creates a new instance
   * @param options the custom overlay options
   */
  constructor(options: AlloyCustomOverlayOptions) {
    this.id = options.id;

    // create the overlay
    this.olOverlay = new OLOverlay({
      autoPan: false, // don't try to fit to the map screen when set position is called on the map
      element: options.element,
      offset: options.offset,
      position: options.position.toMapCoordinate(),
      positioning: options.positioning,
      stopEvent: true, // event propogation to the map viewport is stopped
      insertFirst: false, // append to end to last is always on top
    });
  }
}
