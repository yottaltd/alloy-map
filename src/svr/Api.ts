import { Configuration } from '../api/configuration';
import { LayerApi } from '../api/LayerApi';

/**
 * the api acts as a service for exposing the individual controllers in the web api
 * @ignore
 */
export class Api {
  /**
   * the layer api
   */
  public readonly layer: LayerApi;

  /**
   * creates a new instance
   * @param configuration the configuration options for the api
   */
  constructor(configuration: Configuration) {
    this.layer = new LayerApi(configuration);
  }
}
