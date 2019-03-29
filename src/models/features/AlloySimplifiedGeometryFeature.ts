import OLFeature from 'ol/Feature';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import { AlloyFeature } from './AlloyFeature';
import { AlloyFeatureType } from './AlloyFeatureType';
// tslint:disable-next-line: max-line-length
import { AlloySimplifiedGeometryFeatureProperties } from './AlloySimplifiedGeometryFeatureProperties';

/**
 * an alloy simplified geometry feature which represents geometry or geometries that have been
 * optimised for low lod rendering
 */
export class AlloySimplifiedGeometryFeature implements AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.SimplifiedGeometry; // see end of file for prototype

  /**
   * @implements
   */
  public readonly olFeature: OLFeature;

  /**
   * the cached properties of the alloy simplified geometry feature
   */
  public readonly properties: Readonly<AlloySimplifiedGeometryFeatureProperties>;

  /**
   * creates a new instance
   * @param olFeature the underlying openlayers feature
   * @param properties the properties bundled with the service call
   */
  constructor(olFeature: OLFeature, properties: AlloySimplifiedGeometryFeatureProperties) {
    this.olFeature = olFeature;
    this.properties = properties;
  }

  /**
   * get the "expected" geometry of the alloy simplified geometry feature, this is assumed based on
   * its type
   */
  public getExpectedGeometry():
    | OLPoint
    | OLLineString
    | OLPolygon
    | OLMultiPoint
    | OLMultiLineString
    | OLMultiPolygon
    | OLGeometryCollection {
    // naughty cast here but we are expecting the geometry to be any of the above
    return this.olFeature.getGeometry() as any;
  }
}

/**
 * we are prototyping this property because it is the same on every single instance of this class.
 * there is no built in typescript way to define this without it being turned into an initialised
 * property (set on each constructor) and due to the frequency that these objects are created we
 * really need every small optimisation we can get with regard to features
 */
AlloySimplifiedGeometryFeature.prototype.type = AlloyFeatureType.SimplifiedGeometry;
