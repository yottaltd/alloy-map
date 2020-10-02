import OLGeoJSON from 'ol/format/GeoJSON';
import { AlloyMapError } from '../error/AlloyMapError';
import { AlloyMap } from '../map/core/AlloyMap';
import { AlloyWfsFeature } from '../map/features/AlloyWfsFeature';
import { AlloyWfsLayer } from '../map/layers/wfs/AlloyWfsLayer';
import { AlloyWfsLayerStyle } from '../map/styles/AlloyWfsLayerStyle';
import { OL_FEATURE_TO_FEATURE_ID } from '../utils/FeatureUtils';
import { ProjectionUtils } from '../utils/ProjectionUtils';
import { AlloyWfsCapabilities } from './AlloyWfsCapabilities';
import { AlloyWfsFeatureType } from './AlloyWfsFeatureType';
import { AlloyWfsFormat } from './AlloyWfsFormat';
import { WfsFeatureDescription } from './WfsFeatureDescription';
import { WfsFeatureProperty } from './WfsFeatureProperty';
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
      capsUrl.searchParams.set('request', 'GetCapabilities');

      // Specifying a version is optional.
      if (version) {
        capsUrl.searchParams.set('version', version);
      }

      const caps = await (await fetch(capsUrl.href)).text();

      return await WfsUtils.parseCapabilities(url, caps);
    } catch (e) {
      throw new AlloyMapError(1579267818, 'Failed to get and parse capabilities');
    }
  }

  /**
   * Parser response to GetCapabilities request
   * @param url url of WFS service
   * @param caps GetCapabilities response
   * @ignore
   * @internal
   */
  public static async parseCapabilities(url: string, caps: string): Promise<AlloyWfsCapabilities> {
    try {
      const domparser = new DOMParser();
      const domdoc = domparser.parseFromString(caps, 'text/xml');

      const rootEl: Element | null = domdoc.querySelector('WFS_Capabilities');
      if (!rootEl) {
        throw new AlloyMapError(1595592193, 'Failed to get WFS capabilities root element');
      }

      const attributeVersion: string = rootEl.getAttribute('version') || '1.0.0';

      let title = '';
      const titleNode =
        rootEl.querySelector('Service Title') ||
        rootEl.querySelector('ServiceIdentification Title');
      if (titleNode) {
        title = titleNode.innerHTML;
      }

      // populate the feature types
      const featureTypes: AlloyWfsFeatureType[] = [];
      const featureTypeList: Element | null = rootEl.querySelector('FeatureTypeList');
      if (featureTypeList) {
        const featureTypeElements: Element[] = Array.from(
          featureTypeList.querySelectorAll('FeatureType'),
        );
        featureTypeElements.forEach((ftNode: Element) => {
          try {
            featureTypes.push(WfsVersionParser.parseFeatureTypeNode(ftNode, attributeVersion));
          } catch (error) {
            // ignore feature type if something went wrong parsing it
          }
        });
      }

      // Get supported output formats
      const outputFormats = WfsUtils.getOutputFormats(rootEl, attributeVersion);

      return {
        title,
        url,
        version: attributeVersion,
        outputFormats,
        featureTypes,
      };
    } catch (e) {
      throw new AlloyMapError(1562247485, 'Failed to parse WFS Capabilities');
    }
  }

  /**
   * Gets all property values for this WFS feature
   * @param map `AlloyMap` that contains WFS layer with provided feature
   * @param feature `AlloyWfsFeature` for which we are getting properties
   * @returns array of `WfsFeatureProperty`
   */
  public static getWfsFeatureProperties(
    map: AlloyMap,
    feature: AlloyWfsFeature,
  ): WfsFeatureProperty[] {
    const wfsProperties: WfsFeatureProperty[] = [];
    if (!feature.originatingLayerId) {
      return wfsProperties;
    }

    const layer = map.layers.get(feature.originatingLayerId);
    if (!(layer instanceof AlloyWfsLayer)) {
      throw new AlloyMapError(1571669799, 'wfs feature is not assigned to a wfs layer');
    }

    const descriptions = layer.getWfsDescriptionForStyleId(feature.styleId);
    const olFeatureProperties = feature.olFeature.getProperties();
    const olFeaturePropertiesKeys = Object.keys(olFeatureProperties);
    for (const key of olFeaturePropertiesKeys) {
      if (key === OL_FEATURE_TO_FEATURE_ID) {
        continue;
      }
      if (descriptions === null || descriptions.size === 0 || descriptions.has(key)) {
        let value = olFeatureProperties[key];
        if (key === feature.olFeature.getGeometryName()) {
          value = new OLGeoJSON().writeGeometryObject(value, {
            dataProjection: ProjectionUtils.API_PROJECTION,
            featureProjection: ProjectionUtils.MAP_PROJECTION,
            decimals: 6,
          });
        }
        wfsProperties.push({
          name: key,
          value,
          description: descriptions ? descriptions.get(key) : undefined,
        });
      }
    }
    if (descriptions) {
      for (const descriptionKey of Array.from(descriptions.keys())) {
        if (olFeaturePropertiesKeys.indexOf(descriptionKey) < 0) {
          const description = descriptions.get(descriptionKey);
          if (description && description.nillable) {
            wfsProperties.push({
              name: descriptionKey,
              description,
            });
          }
        }
      }
    }
    return wfsProperties;
  }

  /**
   * Checks whether output format value is supported
   * @param value output format value to check whether it's supported
   * @returns AlloyWfsFormat enum value if provided value is supported
   */
  public static getAlloyWfsFormatForValue(value: string): AlloyWfsFormat | undefined {
    const lowerCaseValue = value.toLowerCase();
    if (lowerCaseValue === 'json' || lowerCaseValue === 'geojson') {
      return AlloyWfsFormat.JSON;
    } else if (lowerCaseValue === 'kml') {
      return AlloyWfsFormat.KML;
    } else if (lowerCaseValue === 'esrijson' || lowerCaseValue === 'esrigeojson') {
      return AlloyWfsFormat.ESRIJSON;
    } else if (lowerCaseValue === 'gml2') {
      return AlloyWfsFormat.GML2;
    } else if (lowerCaseValue === 'gml3') {
      return AlloyWfsFormat.GML3;
    }
  }

  /**
   * Gets feature descriptions used for WFS feature types
   * @param url url of WFS service
   * @ignore
   * @internal
   */
  public static async getFeatureTypeDescription(
    style: AlloyWfsLayerStyle,
  ): Promise<Map<string, WfsFeatureDescription>> {
    const featureTypeUrl = new URL(style.url.trim());
    featureTypeUrl.searchParams.set('service', 'WFS');
    featureTypeUrl.searchParams.set('request', 'DescribeFeatureType');
    featureTypeUrl.searchParams.set('typename', style.featureName);

    const descriptions: Map<string, WfsFeatureDescription> = new Map();
    try {
      // TODO: https://teamyotta.atlassian.net/browse/AL-4636 need to fix this to use imports from
      // correct namespace and elements that reference complexTypes
      const featureTypeDescription = await (await fetch(featureTypeUrl.href)).text();

      await WfsUtils.parseFeatureTypeDescrption(featureTypeDescription, descriptions);
    } catch (error) {
      throw error instanceof AlloyMapError
        ? error
        : new AlloyMapError(1562248443, 'Failed to parse WFS feature type descriptions');
    }
    return descriptions;
  }

  /**
   * Parses GetCapabilities response and gets all supported output formats for GetFeature request.
   * @param root GetCapabilities response root element
   * @param version WFS service version
   * @ignore
   * @internal
   */
  private static getOutputFormats(root: Element, version: string): string[] {
    if (version === '1.0.0') {
      const resultFormat = root.querySelector('Capability Request GetFeature ResultFormat');
      if (resultFormat) {
        const formats = resultFormat.children;
        const values: string[] = [];
        for (let i = 0; i < formats.length; i++) {
          const formatElement = formats.item(i);
          if (formatElement) {
            const value = formatElement.tagName;
            if (WfsUtils.getAlloyWfsFormatForValue(value) !== undefined) {
              values.push(value);
            }
          }
        }
        return values;
      }
    } else {
      const allowedValues = root.querySelector(
        'OperationsMetadata Operation[name=GetFeature] Parameter[name=outputFormat] AllowedValues',
      );
      if (allowedValues) {
        const valueNodes = allowedValues.querySelectorAll('Value');
        const values: string[] = [];
        for (let k = 0; k < valueNodes.length; k++) {
          const value = valueNodes.item(k).innerHTML;
          if (WfsUtils.getAlloyWfsFormatForValue(value) !== undefined) {
            values.push(value);
          }
        }
        return values;
      }
    }
    return ['json'];
  }

  /**
   * parses features type descriptions into a map
   * @param featureTypeDescription xml response of DescribeFeatureType request
   * @param descriptions map to where store descriptions
   * @ignore
   * @internal
   */
  private static async parseFeatureTypeDescrption(
    featureTypeDescription: string,
    descriptions: Map<string, WfsFeatureDescription>,
  ) {
    const domparser = new DOMParser();
    const domdoc = domparser.parseFromString(featureTypeDescription, 'text/xml');
    const schemaRoot = domdoc.getElementsByTagName('xsd:schema').item(0);
    if (!schemaRoot) {
      return;
    }

    const sequences = schemaRoot.querySelectorAll('complexType complexContent extension sequence');
    for (let i = 0; i < sequences.length; i++) {
      const sequence = sequences.item(i);
      if (!sequence) {
        continue;
      }

      const featureTypeElements = sequence.querySelectorAll('element');
      if (featureTypeElements.length > 0) {
        for (let i = 0; i < featureTypeElements.length; i++) {
          const element = featureTypeElements.item(i);
          if (!element) {
            continue;
          }
          const name: string | null = element.getAttribute('name');
          if (name) {
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
        }
      }
    }
  }
}
