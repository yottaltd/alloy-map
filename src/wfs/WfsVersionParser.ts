import { AlloyWfsFeatureType } from './AlloyWfsFeatureType';
import { AlloyBounds } from '../map/core/AlloyBounds';

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
   */
  public static parseFeatureTypeNode(node: Element, version: string): AlloyWfsFeatureType {
    const nameValue = node.querySelector(featureTypeName)!.innerHTML;
    const titleValue = node.querySelector(featureTypeTitle)!.innerHTML;
    const wgs84bboxValue = WfsVersionParser.parseFeatureTypeBbox(node, version);
    const epsgValue = WfsVersionParser.parseFeatureTypeEpsg(node, version);

    return {
      name: nameValue,
      title: titleValue,
      bbox: AlloyBounds.fromMapExtent(wgs84bboxValue),
      epsg: epsgValue,
    };
  }

  /**
   * Gets epsg code for WFS Feature type
   * @param node XML element of FeatureType to find epsg for
   * @param version WFS version
   * @ignore
   * @internal
   */
  private static parseFeatureTypeEpsg(node: Element, version: string): number {
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
    const srsValue = WfsVersionParser.getChildByTagName(node, srsTag)!.innerHTML;
    return Number.parseInt(srsValue.split(':').pop()!, 10);
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
    const isNew = version !== '1.0.0';
    const bbox: Element = WfsVersionParser.getChildByTagName(
      node,
      isNew ? featureTypeBboxNew : featureTypeBboxOld,
    )!;

    let min: number[];
    let max: number[];
    if (isNew) {
      // ows:LowerCorner, ows:UpperCorner
      min = WfsVersionParser.getChildByTagName(bbox, 'ows:LowerCorner')!
        .innerHTML.split(' ')
        .map((s) => Number.parseFloat(s));
      max = WfsVersionParser.getChildByTagName(bbox, 'ows:UpperCorner')!
        .innerHTML.split(' ')
        .map((s) => Number.parseFloat(s));
    } else {
      // minx, miny, maxx, maxy
      min = [
        Number.parseFloat(bbox.getAttribute('minx')!),
        Number.parseFloat(bbox.getAttribute('miny')!),
      ];
      max = [
        Number.parseFloat(bbox.getAttribute('maxx')!),
        Number.parseFloat(bbox.getAttribute('maxy')!),
      ];
    }
    return [min[0], min[1], max[0], max[1]];
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
