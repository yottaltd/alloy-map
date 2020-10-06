import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';
import { AlloyWfsFeatureProperties } from '@/map/features/AlloyWfsFeatureProperties';
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
 * an alloy wfs feature
 */
export class AlloyWfsFeature implements AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.Wfs; // see end of file for prototype

  /**
   * @implements
   */
  public allowsSelection!: true; // see end of file for prototype

  /**
   * @implements
   */
  public allowsHover!: true; // see end of file for prototype

  /**
   * @implements
   */
  public readonly id: string;

  /**
   * @ignore
   * @internal
   */
  public readonly styleId: string;

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
   * the properties for the wfs feature
   */
  public readonly properties: Readonly<AlloyWfsFeatureProperties>;

  /**
   * creates a new instance
   * @param id the id of the feature
   * @param olFeature the underlying openlayers feature
   * @param properties the properties bundled with the service call
   * @param originatingLayerId the layer id that the item originated from
   * @param styleId the style id it relates to
   * @ignore
   * @internal
   */
  public constructor(
    id: string,
    olFeature: OLFeature,
    properties: AlloyWfsFeatureProperties,
    originatingLayerId: string,
    styleId: string,
  ) {
    this.id = id;
    this.olFeature = olFeature;
    this.properties = properties;
    this.originatingLayerId = originatingLayerId;
    this.styleId = styleId;

    // set the id of the feature on the ol feature
    FeatureUtils.setFeatureIdForOlFeature(olFeature, id);
  }

  /**
   * get the "expected" geometry of the alloy wfs feature, this is assumed based on its type
   * @ignore
   * @internal
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
   * @implements
   */
  public setGeometry(geometry: Geometry | null) {
    if (geometry === null) {
      this.olFeature.setGeometry(undefined);
    } else {
      // allows any type
      this.olFeature.setGeometry(ProjectionUtils.GEOJSON.readGeometry(geometry));
    }
  }

  /**
   * @implements
   */
  public setVisible(visible: boolean) {
    this.olFeature.setStyle(visible ? null : []);
  }

  /**
   * Get the property name associated with the default geometry for this feature.
   * @returns geometry name
   */
  public getGeometryName(): string {
    return this.olFeature.getGeometryName();
  }
}

/**
 * we are prototyping this property because it is the same on every single instance of this class.
 * there is no built in typescript way to define this without it being turned into an initialised
 * property (set on each constructor) and due to the frequency that these objects are created we
 * really need every small optimisation we can get with regard to features
 */
AlloyWfsFeature.prototype.type = AlloyFeatureType.Wfs;
AlloyWfsFeature.prototype.allowsSelection = true;
AlloyWfsFeature.prototype.allowsHover = true;
