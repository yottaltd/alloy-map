import WMSCapabilities from 'ol/format/WMSCapabilities.js';
import { GlobalObject } from 'openlayers';

/**
 * utility class for accessing Wms functions due to typing issues.
 * @ignore
 * @internal
 */
export abstract class PolyfillWms {
  /**
   * Parses WMS capabilties into a JSON object.
   * @param input WMS capabilities input to parse
   * @returns WMS capabilities as JSON object
   */
  public static read(input: string | Document | Node): GlobalObject {
    return PolyfillWms.caps.read(input);
  }
  /**
   * Private singleton instance of Wms capabilities reader
   */
  private static caps = new WMSCapabilities();
}
