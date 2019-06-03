import { WfsVersionParser } from './WfsVersionParser';
import { AlloyWfsFeatureType } from './AlloyWfsFeatureType';
import { AlloyWfsCapabilities } from './AlloyWfsCapabilities';
import { AlloyWfsFeatureTypeDescription } from './AlloyWfsFeatureTypeDescription';

/**
 * Public WFS utils to get capabilties of WFS service
 */
export abstract class WfsUtils {
  /**
   * Gets capabilties of WFS service and parses them as `AlloyWfsCapabilties`
   * @param url url of WFS service
   * @param version optional version of Wfs service
   */
  public static async getCapabilities(
    url: string,
    version?: string,
  ): Promise<AlloyWfsCapabilities> {
    let capsUrl = url.trim() + '?service=WFS&request=GetCapabilities';
    // Specifying a version is optional.
    if (version) {
      capsUrl += '&version=' + version;
    }
    const caps = await (await fetch(capsUrl)).text();

    const domparser = new DOMParser();
    const domdoc = domparser.parseFromString(caps, 'text/xml');

    let rootEl: Element;
    const rootEls = domdoc.getElementsByTagName('WFS_Capabilities');
    if (rootEls.length === 1) {
      rootEl = rootEls[0];
    } else {
      rootEl = domdoc.getElementsByTagName('wfs:WFS_Capabilities')[0];
    }

    const attributeVersion: string = rootEl.getAttribute('version') || '1.0.0';

    let title = '';
    try {
      title = rootEl.querySelector('Service')!.querySelector('Title')!.innerHTML;
    } catch (error) {
      // ignore title if something went wrong getting it
    }

    // populate the feature types
    const featureTypes: AlloyWfsFeatureType[] = [];
    const featureTypeList = rootEl.querySelector('FeatureTypeList');
    if (featureTypeList) {
      featureTypeList.querySelectorAll('FeatureType').forEach((ftNode: Element) => {
        try {
          featureTypes.push(WfsVersionParser.parseFeatureTypeNode(ftNode, attributeVersion));
        } catch (error) {
          // ignore feature type if something went wrong parsing it
        }
      });
    }

    return {
      title,
      url,
      version: attributeVersion,
      featureTypes,
    };
  }

  /**
   * Gets feature descriptions used for WFS feature types
   * @param url url of WFS service
   * @ignore
   * @internal
   */
  public static async getFeatureTypeDescription(
    url: string,
  ): Promise<Map<string, AlloyWfsFeatureTypeDescription>> {
    const featureTypeUrl = url.trim() + '?service=WFS&request=DescribeFeatureType';

    const descriptions: Map<string, AlloyWfsFeatureTypeDescription> = new Map();
    try {
      const featureTypeDescription = await (await fetch(featureTypeUrl)).text();

      const domparser = new DOMParser();
      const domdoc = domparser.parseFromString(featureTypeDescription, 'text/xml');
      const schemaRoot = domdoc.getElementsByTagName('xsd:schema')[0];

      const featureTypeElements = schemaRoot
        .querySelector('xsd:complexType')!
        .querySelector('xsd:complexContent')!
        .querySelector('xsd:extension')!
        .querySelector('xsd:sequence')!
        .querySelectorAll('xsd:element');
      if (featureTypeElements) {
        Array.from(featureTypeElements.values()).forEach((element) => {
          const name: string | null = element.getAttribute('name');
          if (name) {
            const nillable: string | null = element.getAttribute('nillable');
            const minOccurs: string | null = element.getAttribute('minOccurs');
            const maxOccurs: string | null = element.getAttribute('maxOccurs');
            const type: string | null = element.getAttribute('type');
            descriptions.set(name, {
              name,
              nillable: nillable === 'true' || true,
              minOccurs: minOccurs ? parseInt(minOccurs, 10) : 0,
              maxOccurs: maxOccurs ? parseInt(maxOccurs, 10) : 1,
              type: type || 'xsd:string', // xsd:string, xsd:double, gml:PointPropertyType....
            });
          }
        });
      }
    } catch (error) {
      return descriptions;
    }
    return descriptions;
  }
}
