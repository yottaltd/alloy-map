import { Point } from 'geojson';
import OLFeature from 'ol/Feature';
import OLPoint from 'ol/geom/Point';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { ProjectionUtils } from '../../utils/ProjectionUtils';
import { AlloyConnectedFeatureProperties } from './AlloyConnectedFeatureProperties';
import { AlloyFeature } from './AlloyFeature';
import { AlloyFeatureType } from './AlloyFeatureType';

/**
 * an alloy Connected feature which represents a connected unit with point geometry
 */
export abstract class AlloyConnectedFeature implements AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType; // see end of file for prototype

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
   * the cached properties of the alloy Connected feature
   */
  public readonly properties: Readonly<AlloyConnectedFeatureProperties>;

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
    properties: AlloyConnectedFeatureProperties,
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
   * get the "expected" geometry of the alloy cable, this is assumed based on its type
   * @ignore
   * @internal
   */
  public getExpectedGeometry(): OLPoint {
    // naughty cast here but we are expecting the geometry to always be a Point
    return this.olFeature.getGeometry() as OLPoint;
  }

  /**
   * @implements
   */
  public setGeometry(geometry: Point | null) {
    if (geometry === null) {
      this.olFeature.setGeometry(undefined as any);
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

AlloyConnectedFeature.prototype.allowsSelection = false;
AlloyConnectedFeature.prototype.allowsHover = false;
