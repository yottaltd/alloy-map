import { debug, Debugger } from 'debug';
import { AlloyMapError } from '../error/AlloyMapError';
import { AlloyWfsCapabilities } from './AlloyWfsCapabilities';
import { AlloyWfsFeatureType } from './AlloyWfsFeatureType';
import { WfsFeatureDescription } from './WfsFeatureDescription';
import { WfsVersionParser } from './WfsVersionParser';

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
    try {
      const capsUrl = new URL(url.trim());
      capsUrl.searchParams.set('service', 'WFS');
      capsUrl.searchParams.set('request', 'GetCapabilties');

      // Specifying a version is optional.
      if (version) {
        capsUrl.searchParams.set('version', version);
      }
      WfsUtils.debugger(`Fetching WFS capabilities for ${capsUrl.href}`);

      const caps = await (await fetch(capsUrl.href)).text();

      WfsUtils.debugger('parsing xml');
      const domparser = new DOMParser();
      const domdoc = domparser.parseFromString(caps, 'text/xml');

      let rootEl: Element;
      const rootEls = domdoc.getElementsByTagName('WFS_Capabilities');
      if (rootEls.length === 1) {
        rootEl = rootEls[0];
      } else {
        rootEl = domdoc.getElementsByTagName('wfs:WFS_Capabilities')[0];
      }
      WfsUtils.debugger('found capabilities root element');

      const attributeVersion: string = rootEl.getAttribute('version') || '1.0.0';
      WfsUtils.debugger(`capabilities version = ${attributeVersion}`);

      let title = '';
      const serviceNode = rootEl.querySelector('Service');
      if (serviceNode) {
        const titleNode = serviceNode.querySelector('Title');
        if (titleNode) {
          title = titleNode.innerHTML;
        }
      }
      WfsUtils.debugger(`capabilties title = ${title}`);

      // populate the feature types
      const featureTypes: AlloyWfsFeatureType[] = [];
      const featureTypeList = rootEl.querySelector('FeatureTypeList');
      if (featureTypeList) {
        featureTypeList.querySelectorAll('FeatureType').forEach((ftNode: Element) => {
          try {
            featureTypes.push(WfsVersionParser.parseFeatureTypeNode(ftNode, attributeVersion));
          } catch (error) {
            // ignore feature type if something went wrong parsing it
            WfsUtils.debugger('failed to parse feature type node');
          }
        });
      } else {
        WfsUtils.debugger('did not find feature type list in capabilities');
      }
      return {
        title,
        url,
        version: attributeVersion,
        featureTypes,
      };
    } catch (e) {
      throw new AlloyMapError(1562247485, 'Failed to parse WFS Capabilities');
    }
  }

  /**
   * Gets feature descriptions used for WFS feature types
   * @param url url of WFS service
   * @ignore
   * @internal
   */
  public static async getFeatureTypeDescription(
    url: string,
  ): Promise<Map<string, WfsFeatureDescription>> {
    const featureTypeUrl = new URL(url.trim());
    featureTypeUrl.searchParams.set('service', 'WFS');
    featureTypeUrl.searchParams.set('request', 'DescribeFeatureType');

    const descriptions: Map<string, WfsFeatureDescription> = new Map();
    try {
      WfsUtils.debugger(`requesting WFS feature type descriptions for ${featureTypeUrl.href}`);
      const featureTypeDescription = await (await fetch(featureTypeUrl.href)).text();

      WfsUtils.debugger('parsing xml');
      const domparser = new DOMParser();
      const domdoc = domparser.parseFromString(featureTypeDescription, 'text/xml');
      const schemaRoot = domdoc.getElementsByTagName('xsd:schema')[0];

      const complexType = schemaRoot.querySelector('xsd:complexType');
      if (!complexType) {
        throw new AlloyMapError(1562248333, 'Failed to find complex type node in schema');
      }
      const complexContent = complexType.querySelector('xsd:complexContent');
      if (!complexContent) {
        throw new AlloyMapError(1562248352, 'Failed to find complex content node in schema');
      }
      const extension = complexContent.querySelector('xsd:extension');
      if (!extension) {
        throw new AlloyMapError(1562248368, 'Failed to find extension node in schema');
      }
      const sequence = extension.querySelector('xsd:sequence');
      if (!sequence) {
        throw new AlloyMapError(1562248383, 'Failed to find sequence node in schema');
      }

      const featureTypeElements = sequence.querySelectorAll('xsd:element');
      if (featureTypeElements) {
        Array.from(featureTypeElements.values()).forEach((element) => {
          const name: string | null = element.getAttribute('name');
          if (name) {
            WfsUtils.debugger(`Parsing description for parameter ${name}`);

            const nillable: string | null = element.getAttribute('nillable');

            const minOccursAttribute: string | null = element.getAttribute('minOccurs');
            const minOccurs = minOccursAttribute ? parseInt(minOccursAttribute, 10) : 0;
            if (typeof minOccurs !== 'number' || isNaN(minOccurs)) {
              throw new AlloyMapError(
                1562249206,
                `Failed to parse min occurs for description ${name}`,
              );
            }

            const maxOccursAttribute: string | null = element.getAttribute('maxOccurs');
            const maxOccurs = maxOccursAttribute ? parseInt(maxOccursAttribute, 10) : 1;
            if (typeof maxOccurs !== 'number' || isNaN(maxOccurs)) {
              throw new AlloyMapError(
                1562249206,
                `Failed to parse max occurs for description ${name}`,
              );
            }

            const type: string | null = element.getAttribute('type');

            descriptions.set(name, {
              name,
              nillable: nillable === 'true' || true,
              minOccurs,
              maxOccurs,
              type: type || 'xsd:string', // xsd:string, xsd:double, gml:PointPropertyType....
            });
          }
        });
      }
    } catch (error) {
      throw error instanceof AlloyMapError
        ? error
        : new AlloyMapError(1562248443, 'Failed to parse WFS feature type descriptions');
    }
    return descriptions;
  }
  /**
   * debugger instance
   * @ignore
   * @internal
   */
  private static readonly debugger: Debugger = debug('alloymaps').extend(WfsUtils.name);
}
