import OLWmsCapabilities from 'ol/format/WMSCapabilities.js';
import { WmsCapabilities } from '../wms/WmsCapabilities';

/**
 * reader for wms capabilties
 * @ignore
 * @internal
 */
const OL_WMS_CAPABILITIES = new OLWmsCapabilities();

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
  public static read(input: string | Document | Node): WmsCapabilities {
    const parsed = OL_WMS_CAPABILITIES.read(input);
    return {
      Title: parsed.Service.Title,
      Layer: parsed.Capability.Layer,
    };
  }
}
