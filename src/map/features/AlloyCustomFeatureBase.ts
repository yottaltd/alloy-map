import { AlloyCustomFeatureProperties } from '@/map/features/AlloyCustomFeatureProperties';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';
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
 * an alloy custom feature which represents something being added to the map by a user or
 * programatically, it can represent anything
 */
export abstract class AlloyCustomFeatureBase extends AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType;

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
   * the properties for the custom feature
   */
  public readonly properties: Readonly<AlloyCustomFeatureProperties>;

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
    properties: AlloyCustomFeatureProperties,
    originatingLayerId: string,
  ) {
    super();
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
}
