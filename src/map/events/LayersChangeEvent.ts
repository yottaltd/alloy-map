import { AlloyLayer } from '../layers/AlloyLayer';

/**
 * event fired when the map layers are changed
 * @event
 */
export class LayersChangeEvent {
  /**
   * the updated layers which are "current" on the map instance
   */
  private currentLayers: Map<string, AlloyLayer>;

  /**
   * creates a new event instance
   * @param layers the layers that are current
   */
  constructor(layers: Map<string, AlloyLayer>) {
    this.currentLayers = new Map(layers);
  }

  /**
   * gets the layers currently on the map
   */
  public get layers(): Map<string, AlloyLayer> {
    return new Map(this.currentLayers);
  }
}
