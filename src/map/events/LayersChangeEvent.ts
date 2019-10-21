import { AlloyLayer } from '../layers/AlloyLayer';

/**
 * event fired when the map layers are changed
 * @event
 */
export class LayersChangeEvent {
  /**
   * the updated layers which are "current" on the map instance
   * @ignore
   * @internal
   */
  private afterLayers: Map<string, AlloyLayer>;

  /**
   * the layers which were previously on the map
   * @ignore
   * @internal
   */
  private beforeLayers: Map<string, AlloyLayer>;

  /**
   * creates a new event instance
   * @param layers the layers that are current
   * @param oldLayers the layers which were previously on the map
   * @ignore
   * @internal
   */
  constructor(layers: Map<string, AlloyLayer>, oldLayers: Map<string, AlloyLayer>) {
    this.afterLayers = layers;
    this.beforeLayers = oldLayers;
  }

  /**
   * gets the layers currently on the map
   */
  public get layers(): Map<string, AlloyLayer> {
    return new Map(this.afterLayers);
  }

  /**
   * gets layers which were previously on the map
   */
  public get oldLayers(): Map<string, AlloyLayer> {
    return new Map(this.beforeLayers);
  }
}
