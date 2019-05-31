import WMSCapabilities from 'ol/format/WMSCapabilities.js';
import { GlobalObject } from 'openlayers';

/**
 * utility class for accessing WMS functions due to typing issues.
 * @ignore
 * @internal
 */
export abstract class PolyfillWMS {

  /**
   * Prases WMS capabilties into a JSON object.
   * @param input WMS capabilities input to parse
   * @returns WMS capabilities as JSON object
   */
  public static read(input: string | Document | Node): GlobalObject {
    return PolyfillWMS.caps.read(input);
  }
  /**
   * Private singleton instance of WMS capabilities reader
   */
  private static caps = new WMSCapabilities();
}
