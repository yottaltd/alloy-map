import { debug, Debugger } from 'debug';
import { AlloyMapError } from '../error/AlloyMapError';
import { AlloyBounds } from '../map/core/AlloyBounds';
import { AlloyWfsFeatureType } from './AlloyWfsFeatureType';

/**
 * tag names used in WFS GetCapabilties response FeatureType that are used to get info
 */
const featureTypeName = 'Name';
const featureTypeTitle = 'Title';
const featureTypeEpsg100 = 'SRS';
const featureTypeEpsg110 = 'DefaultSRS';
const featureTypeEpsg200 = 'DefaultCRS';
const featureTypeBboxOld = 'LatLongBoundingBox';
const featureTypeBboxNew = 'ows:WGS84BoundingBox';

/**
 * internal parser for parsing WFS capabilties feature types for different WFS versions
 * @ignore
 * @internal
 */
export abstract class WfsVersionParser {
  /**
   * Parses XML GetCapabilities response FeatureType into `AlloyWfsFeatureType`
   * @param node XML element of FeatureType to parse
   * @param version version of WFS service
   * @param usePrefix whether nodes have 'wfs:' at the start of tags
   */
  public static parseFeatureTypeNode(
    node: Element,
    version: string,
    usePrefix: boolean = false,
  ): AlloyWfsFeatureType {
    WfsVersionParser.debugger('parsing feature type node');

    const nameNode = usePrefix
      ? WfsVersionParser.getChildByTagName(node, `wfs:${featureTypeName}`)
      : node.querySelector(featureTypeName);
    if (!nameNode) {
      throw new AlloyMapError(1562248616, 'Failed to get feature type name node');
    }
    const nameValue = nameNode.innerHTML;
    const titleNode = usePrefix
      ? WfsVersionParser.getChildByTagName(node, `wfs:${featureTypeTitle}`)
      : node.querySelector(featureTypeTitle);
    if (!titleNode) {
      throw new AlloyMapError(1562248648, 'Failed to get feature type title node');
    }
    const titleValue = titleNode.innerHTML;
    const wgs84bboxValue = WfsVersionParser.parseFeatureTypeBbox(node, version);
    const epsgValue = WfsVersionParser.parseFeatureTypeEpsg(node, version, usePrefix);

    WfsVersionParser.debugger(`finished parsing feature type node ${titleValue}`);

    return {
      name: nameValue,
      title: titleValue,
      bbox: AlloyBounds.fromMapExtent(wgs84bboxValue),
      epsg: epsgValue,
    };
  }
  /**
   * debugger instance
   * @ignore
   * @internal
   */
  private static readonly debugger: Debugger = debug('alloymaps').extend(WfsVersionParser.name);

  /**
   * Gets epsg code for WFS Feature type
   * @param node XML element of FeatureType to find epsg for
   * @param version WFS version
   * @param usePrefix whether `wfs:` prefix for tag names is used
   * @ignore
   * @internal
   */
  private static parseFeatureTypeEpsg(
    node: Element,
    version: string,
    usePrefix: boolean = false,
  ): number {
    WfsVersionParser.debugger('parsing feature type epsg');
    let srsTag: string;
    switch (version) {
      case '1.0.0':
        srsTag = featureTypeEpsg100;
        break;
      case '1.1.0':
        srsTag = featureTypeEpsg110;
        break;
      default:
        srsTag = featureTypeEpsg200;
        break;
    }
    const srsNode = WfsVersionParser.getChildByTagName(node, `${usePrefix ? 'wfs:' : ''}${srsTag}`);
    if (!srsNode) {
      throw new AlloyMapError(1562248514, 'Failed to get srs node for feature type');
    }
    const srsValue = srsNode.innerHTML.split(':').pop();
    if (!srsValue) {
      throw new AlloyMapError(1562248587, 'Failed to get srs node value for feature type');
    }
    const srsNumber = Number.parseInt(srsValue, 10);
    if (typeof srsNumber !== 'number' || isNaN(srsNumber)) {
      throw new AlloyMapError(1562249473, 'Failed to parse srs node value for feature type');
    }
    WfsVersionParser.debugger(`finished parsing feature type epsg ${srsNumber}`);
    return srsNumber;
  }

  /**
   * Gets bounding box for WFS Feature type
   * @param node XML element of FeatureType to find bounding box for
   * @param version WFS version
   * @ignore
   * @internal
   */
  private static parseFeatureTypeBbox(
    node: Element,
    version: string,
  ): [number, number, number, number] {
    WfsVersionParser.debugger('parsing feature type bbox');
    const isNew = version !== '1.0.0';
    const bbox: Element = WfsVersionParser.getChildByTagName(
      node,
      isNew ? featureTypeBboxNew : featureTypeBboxOld,
    )!;

    let min: number[];
    let max: number[];
    if (isNew) {
      // ows:LowerCorner, ows:UpperCorner
      const lowerCornerNode = WfsVersionParser.getChildByTagName(bbox, 'ows:LowerCorner');
      const upperCornerNode = WfsVersionParser.getChildByTagName(bbox, 'ows:UpperCorner');
      if (!lowerCornerNode || !upperCornerNode) {
        throw new AlloyMapError(1562248808, 'Failed to get bbox nodes for feature type');
      }
      min = lowerCornerNode.innerHTML.split(' ').map((s) => Number.parseFloat(s));
      max = upperCornerNode.innerHTML.split(' ').map((s) => Number.parseFloat(s));
    } else {
      const minxAttribute = bbox.getAttribute('minx');
      const minyAttribute = bbox.getAttribute('miny');
      const maxxAttribute = bbox.getAttribute('maxx');
      const maxyAttribute = bbox.getAttribute('maxy');
      if (!minxAttribute || !minyAttribute || !maxxAttribute || !maxyAttribute) {
        throw new AlloyMapError(1562248987, 'Failed to parse bbox attributes for feature type');
      }
      // minx, miny, maxx, maxy
      min = [Number.parseFloat(minxAttribute), Number.parseFloat(minyAttribute)];
      max = [Number.parseFloat(maxxAttribute), Number.parseFloat(maxyAttribute)];
    }
    if (min.length !== 2 || max.length !== 2) {
      throw new AlloyMapError(
        1562249914,
        `Incorrect number of coordinates for bbox ${min} ; ${max}`,
      );
    }
    const bboxValue: [number, number, number, number] = [min[0], min[1], max[0], max[1]];
    bboxValue.forEach((n) => {
      if (typeof n !== 'number' || isNaN(n)) {
        throw new AlloyMapError(
          1562248880,
          `Failed to parse bbox min value for feature type - ${bboxValue.join(',')}`,
        );
      }
    });
    WfsVersionParser.debugger('finished parsing feature type bbox');
    return bboxValue;
  }

  /**
   * Finds child node by tag name
   * @param node XML element
   * @param tag child node name
   * @ignore
   * @internal
   */
  private static getChildByTagName(node: Element, tag: string): Element | undefined {
    for (const child of node.children) {
      if (child.tagName.toLowerCase() === tag.toLowerCase()) {
        return child;
      }
    }
    return undefined;
  }
}
