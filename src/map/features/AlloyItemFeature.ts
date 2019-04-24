import OLFeature from 'ol/Feature';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { AlloyFeature } from './AlloyFeature';
import { AlloyFeatureType } from './AlloyFeatureType';
import { AlloyItemFeatureProperties } from './AlloyItemFeatureProperties';

/**
 * an alloy item feature which represents a basic item feature on the map
 */
export class AlloyItemFeature implements AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.Item; // see end of file for prototype

  /**
   * @implements
   */
  public readonly id: string;

  /**
   * @implements
   * @ignore
   */
  public allowsSelection!: true; // see end of file for prototype

  /**
   * @implements
   * @ignore
   */
  public allowsHover!: true; // see end of file for prototype

  /**
   * @implements
   * @ignore
   */
  public readonly olFeature: OLFeature;

  /**
   * @implements
   * @ignore
   */
  public readonly originatingLayerId?: string;

  /**
   * the cached properties of the alloy item feature
   */
  public readonly properties: Readonly<AlloyItemFeatureProperties>;

  /**
   * creates a new instance
   * @param id the id of the feature
   * @param olFeature the underlying openlayers feature
   * @param properties the properties bundled with the service call
   * @param originatingLayerId the layer id that the item originated from
   */
  constructor(
    id: string,
    olFeature: OLFeature,
    properties: AlloyItemFeatureProperties,
    originatingLayerId?: string,
  ) {
    this.id = id;
    this.olFeature = olFeature;
    this.properties = properties;
    this.originatingLayerId = originatingLayerId;

    // set the id of the feature on the ol feature
    FeatureUtils.setFeatureIdForOlFeature(olFeature, id);
  }

  /**
   * get the "expected" geometry of the alloy item, this is assumed based on its type
   * @ignore
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
AlloyItemFeature.prototype.allowsSelection = true;
AlloyItemFeature.prototype.allowsHover = true;
