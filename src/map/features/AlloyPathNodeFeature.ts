import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';
import { AlloyPathNodeFeatureProperties } from '@/map/features/AlloyPathNodeFeatureProperties';
import { FeatureUtils } from '@/utils/FeatureUtils';
import { ProjectionUtils } from '@/utils/ProjectionUtils';
import { Point } from 'geojson';
import OLFeature from 'ol/Feature';
import OLPoint from 'ol/geom/Point';

/**
 * an alloy path node feature which represents a connected unit with point geometry
 */
export abstract class AlloyPathNodeFeature extends AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType; // overridden in implemented class

  /**
   * @implements
   */
  public readonly id: string;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public abstract allowsSelection: boolean;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public abstract allowsHover: boolean;

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
   * the cached properties of the alloy path node feature
   */
  public readonly properties: Readonly<AlloyPathNodeFeatureProperties>;

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
    properties: AlloyPathNodeFeatureProperties,
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
