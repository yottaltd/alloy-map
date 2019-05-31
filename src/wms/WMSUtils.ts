import { AlloyWMSCapabilities } from './AlloyWMSCapabilities';
import { PolyfillWMS } from '../polyfills/PolyfillWMS';
import { AlloyWMSCapabilitiesLayer } from './AlloyWMSCapabilitiesLayer';

export abstract class WMSUtils {
  /**
   * Gets capabilities for WMS server at given url
   * @param url url for WMS server without any query parameters
   */
  public static async getCapabilities(url: string): Promise<AlloyWMSCapabilities> {
    const capsText = await (await fetch(url + '&REQUEST=GetCapabilities&SERVICE=WMS')).text();
    const parsedCaps = PolyfillWMS.read(capsText);

    const capabilities: AlloyWMSCapabilities = {
      title: parsedCaps.Service.Title,
      url,
      layer: WMSUtils.parseWmsLayer(parsedCaps.Capability.Layer),
    };
    return capabilities;
  }

  /**
   * Wraps WMS capabilities layer
   * @param layer WMS GetCapabilities response Layer object
   * @ignore
   * @internal
   */
  private static parseWmsLayer(layer: any): AlloyWMSCapabilitiesLayer {
    return {
      name: layer.Name,
      title: layer.Title,
      layers: (layer.Layer || []).map((l: any) => this.parseWmsLayer(l)),
      opaque: layer.opaque || false,
    };
  }
}
