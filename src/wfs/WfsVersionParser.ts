import { AlloyMapError } from '../error/AlloyMapError';
import { AlloyBounds } from '../map/core/AlloyBounds';
import { AlloyWfsFeatureType } from './AlloyWfsFeatureType';
import { AlloyCoordinate } from '../map/core/AlloyCoordinate';

/**
 * tag names used in WFS GetCapabilties response FeatureType that are used to get info
 */
const featureTypeName = 'Name';
const featureTypeTitle = 'Title';
const featureTypeEpsg100 = 'SRS';
const featureTypeEpsg110 = 'DefaultSRS';
const featureTypeEpsg200 = 'DefaultCRS';
const featureTypeBboxOld = 'LatLongBoundingBox';
const featureTypeBboxNew = 'WGS84BoundingBox';

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
    const nameNode = node.querySelector(featureTypeName);
    if (!nameNode) {
      throw new AlloyMapError(1562248616, 'Failed to get feature type name node');
    }
    const nameValue = nameNode.innerHTML;
    const titleNode = node.querySelector(featureTypeTitle);
    if (!titleNode) {
      throw new AlloyMapError(1562248648, 'Failed to get feature type title node');
    }
    const titleValue = titleNode.innerHTML;
    const wgs84bboxValue = WfsVersionParser.parseFeatureTypeBbox(node, version);
    const epsgValue = WfsVersionParser.parseFeatureTypeEpsg(node, version);

    return {
      name: nameValue,
      title: titleValue,
      bbox: new AlloyBounds(
        new AlloyCoordinate(wgs84bboxValue[0], wgs84bboxValue[1]),
        new AlloyCoordinate(wgs84bboxValue[2], wgs84bboxValue[3]),
      ),
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
    const srsNode = node.querySelector(srsTag);
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
    const isNew = version !== '1.0.0';
    const bbox: Element | null = node.querySelector(
      isNew ? featureTypeBboxNew : featureTypeBboxOld,
    );
    if (!bbox) {
      throw new AlloyMapError(1583862837, 'Could not get bbox');
    }

    let min: number[];
    let max: number[];
    if (isNew) {
      // ows:LowerCorner, ows:UpperCorner
      const lowerCornerNode = bbox.querySelector('LowerCorner');
      const upperCornerNode = bbox.querySelector('UpperCorner');
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
    return bboxValue;
  }
}
