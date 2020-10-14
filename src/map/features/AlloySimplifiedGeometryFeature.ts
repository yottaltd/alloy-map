import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';
// eslint-disable-next-line max-len
import { AlloySimplifiedGeometryFeatureProperties } from '@/map/features/AlloySimplifiedGeometryFeatureProperties';
import { FeatureUtils } from '@/utils/FeatureUtils';
import { ProjectionUtils } from '@/utils/ProjectionUtils';
import { Geometry } from 'geojson';
import OLFeature from 'ol/Feature';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';

/**
 * an alloy simplified geometry feature which represents geometry or geometries that have been
 * optimised for low lod rendering
 */
export class AlloySimplifiedGeometryFeature extends AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.SimplifiedGeometry; // see end of file for prototype

  /**
   * @implements
   */
  public readonly id: string;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public allowsSelection!: false; // see end of file for prototype

  /**
   * @implements
   * @ignore
   * @internal
   */
  public allowsHover!: false; // see end of file for prototype

  /**
   * @implements
   * @ignore
   * @internal
   */
  public readonly olFeature: OLFeature;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public readonly originatingLayerId?: string;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public readonly onSelectionInteraction: undefined;

  /**
   * the cached properties of the alloy simplified geometry feature
   */
  public readonly properties: Readonly<AlloySimplifiedGeometryFeatureProperties>;

  /**
   * creates a new instance
   * @param id the id of the feature
   * @param olFeature the underlying openlayers feature
   * @param properties the properties bundled with the service call
   * @param originatingLayerId the layer id that the item originated from
   * @ignore
   * @internal
   */
  constructor(
    id: string,
    olFeature: OLFeature,
    properties: AlloySimplifiedGeometryFeatureProperties,
    originatingLayerId?: string,
  ) {
    super();
    this.id = id;
    this.olFeature = olFeature;
    this.properties = properties;
    this.originatingLayerId = originatingLayerId;

    // set the id of the feature on the ol feature
    FeatureUtils.setFeatureIdForOlFeature(olFeature, id);
  }

  /**
   * get the "expected" geometry of the alloy simplified geometry feature, this is assumed based on
   * its type
   * @ignore
   * @internal
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

  /**
   * @implements
   */
  public setGeometry(geometry: Geometry | null) {
    if (geometry === null) {
      this.olFeature.setGeometry(undefined);
    } else {
      this.olFeature.setGeometry(ProjectionUtils.GEOJSON.readGeometry(geometry));
    }
  }

  /**
   * @implements
   */
  public setVisible(visible: boolean) {
    this.olFeature.setStyle(visible ? null : []);
  }
}

/**
 * we are prototyping this property because it is the same on every single instance of this class.
 * there is no built in typescript way to define this without it being turned into an initialised
 * property (set on each constructor) and due to the frequency that these objects are created we
 * really need every small optimisation we can get with regard to features
 */
AlloySimplifiedGeometryFeature.prototype.type = AlloyFeatureType.SimplifiedGeometry;
AlloySimplifiedGeometryFeature.prototype.allowsSelection = false;
AlloySimplifiedGeometryFeature.prototype.allowsHover = false;
