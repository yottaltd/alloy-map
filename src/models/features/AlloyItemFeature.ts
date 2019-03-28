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
import { AlloyItemFeatureProperties } from './AlloyItemFeatureProperties';

/**
 * an alloy item feature which represents a basic item feature on the map
 */
export class AlloyItemFeature implements AlloyFeature {
  public type!: AlloyFeatureType.Item; // see end of file for prototype
  public readonly olFeature: OLFeature;

  /**
   * the cached properties of the alloy item feature
   */
  public readonly properties: Readonly<AlloyItemFeatureProperties>;

  /**
   * creates a new instance
   * @param olFeature the underlying openlayers feature
   * @param properties the properties bundled with the service call
   */
  constructor(olFeature: OLFeature, properties: AlloyItemFeatureProperties) {
    this.olFeature = olFeature;
    this.properties = properties;
  }

  /**
   * get the "expected" geometry of the alloy item, this is assumed based on its type
   */
  public getExpectedGeometry():
    | OLPoint
    | OLMultiPoint
    | OLLineString
    | OLMultiLineString
    | OLPolygon
    | OLMultiPolygon
    | OLGeometryCollection {
    // naughty cast here but we are expecting the geometry to always be of one of the above types
    // the reason we don't check is down to performance
    return this.olFeature.getGeometry() as any;
  }
}

/**
 * we are prototyping this property because it is the same on every single instance of this class.
 * there is no built in typescript way to define this without it being turned into an initialised
 * property (set on each constructor) and due to the frequency that these objects are created we
 * really need every small optimisation we can get with regard to features
 */
AlloyItemFeature.prototype.type = AlloyFeatureType.Item;
