import { WmtsCapabilities } from '@/wmts/WmtsCapabilities';
import OLWmtsCapabilities from 'ol/format/WMTSCapabilities';

/**
 * reader for wmts capabilties
 * @ignore
 * @internal
 */
const OL_WMTS_CAPABILITIES = new OLWmtsCapabilities();

/**
 * utility class for accessing Wms functions due to typing issues.
 * @ignore
 * @internal
 */
export abstract class PolyfillWmts {
  /**
   * Parses WMS capabilties into a JSON object.
   * @param input WMS capabilities input to parse
   * @returns WMS capabilities as JSON object
   */
  public static read(input: string | Document | Element): WmtsCapabilities {
    const parsed = OL_WMTS_CAPABILITIES.read(input);
    return {
      Title: parsed.ServiceIdentification.Title,
      Layers: parsed.Contents.Layer,
      TileMatrixSet: parsed.Contents.TileMatrixSet,
      DefaultCaps: parsed,
    };
  }
}
