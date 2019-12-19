import OLCollection from 'ol/Collection';
import { defaults } from 'ol/interaction';
import OLInteraction from 'ol/interaction/Interaction';

/**
 * wraps the openlayers ol/interaction module due to typing issues.
 * see: https://openlayers.org/en/latest/apidoc/module-ol_interaction.html
 * @ignore
 * @internal
 */
export abstract class PolyfillInteractions {
  /**
   * @returns collection of default map interactions
   */
  public static defaults(): OLCollection<OLInteraction> {
    return defaults();
  }
}
