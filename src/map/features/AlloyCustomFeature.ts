import OLFeature from 'ol/Feature';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { AlloyCustomFeatureProperties } from './AlloyCustomFeatureProperties';
import { AlloyFeature } from './AlloyFeature';
import { AlloyFeatureType } from './AlloyFeatureType';
import { Geometry } from 'geojson';
import { ProjectionUtils } from '../../utils/ProjectionUtils';

/**
 * an alloy custom feature which represents something being added to the map by a user or
 * programatically, it can represent anything
 */
export class AlloyCustomFeature implements AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.Custom; // see end of file for prototype

  /**
   * @implements
   */
  public readonly id: string;

  /**
   * @implements
   */
  public readonly allowsSelection: boolean;

  /**
   * @implements
   */
  public readonly allowsHover: boolean;

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
   * the properties for the custom feature
   */
  public readonly properties: Readonly<AlloyCustomFeatureProperties>;

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
    properties: AlloyCustomFeatureProperties,
    originatingLayerId: string,
  ) {
    this.id = id;
    this.olFeature = olFeature;
    this.properties = properties;
    this.originatingLayerId = originatingLayerId;

    // set the selection and hover mode
    this.allowsSelection =
      properties.allowsSelection !== undefined ? properties.allowsSelection : true;
    this.allowsHover = properties.allowsHover !== undefined ? properties.allowsHover : true;

    // set the id of the feature on the ol feature
    FeatureUtils.setFeatureIdForOlFeature(olFeature, id);
  }

  /**
   * get the "expected" geometry of the alloy custom feature, this is assumed based on its type
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

  /**
   * Sets geometry of the underlying alloy feature
   * @param geometry geometry to set for feature
   */
  public setGeometry(geometry: Geometry) {
    this.olFeature.setGeometry(ProjectionUtils.GEOJSON.readGeometry(geometry));
  }

  /**
   * Sets style of the alloy feature
   * @param style styles to sets on feature
   */
  public setStyle(style: OLStyle | OLStyle[] | null) {
    this.olFeature.setStyle(style);
  }
}

/**
 * we are prototyping this property because it is the same on every single instance of this class.
 * there is no built in typescript way to define this without it being turned into an initialised
 * property (set on each constructor) and due to the frequency that these objects are created we
 * really need every small optimisation we can get with regard to features
 */
AlloyCustomFeature.prototype.type = AlloyFeatureType.Custom;
