import { LineString } from 'geojson';
import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { ProjectionUtils } from '../../utils/ProjectionUtils';
import { AlloyAnimationLayer } from '../layers/animation/AlloyAnimationLayer';
import { AlloyAnimatedFeatureProperties } from './AlloyAnimatedFeatureProperties';
import { AlloyFeature } from './AlloyFeature';
import { AlloyFeatureType } from './AlloyFeatureType';

/**
 * an alloy animated feature which represents an animated feature with single line string geometry
 */
export abstract class AlloyAnimatedFeature implements AlloyFeature {
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
  public allowsSelection!: true; // see end of file for prototype

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
   * the cached properties of the alloy Animated feature
   */
  public readonly properties: Readonly<AlloyAnimatedFeatureProperties>;

  private readonly layer: AlloyAnimationLayer;

  /**
   * creates a new instance
   * @param id the id of the feature
   * @param olFeature the underlying openlayers feature
   * @param properties the properties bundled with the service call
   * @param layer the layer that the item is added to
   * @ignore
   * @internal
   */
  constructor(
    id: string,
    olFeature: OLFeature,
    properties: AlloyAnimatedFeatureProperties,
    layer: AlloyAnimationLayer,
  ) {
    this.id = id;
    this.olFeature = olFeature;
    this.properties = properties;
    this.layer = layer;
    this.originatingLayerId = this.layer.id;

    // set the id of the feature on the ol feature
    FeatureUtils.setFeatureIdForOlFeature(olFeature, id);
  }

  /**
   * get the "expected" geometry of the alloy Animated, this is assumed based on its type
   * @ignore
   * @internal
   */
  public getExpectedGeometry(): OLLineString {
    // naughty cast here but we are expecting the geometry to always be a LineString
    return this.olFeature.getGeometry() as OLLineString;
  }

  /**
   * @implements
   */
  public setGeometry(geometry: LineString | null) {
    this.layer.animateFeature(this, false);
    if (geometry === null) {
      this.olFeature.setGeometry(undefined as any);
    } else {
      this.olFeature.setGeometry(ProjectionUtils.GEOJSON.readGeometry(geometry));
      this.layer.animateFeature(this, true);
    }
  }

  /**
   * @implements
   */
  public setVisible(visible: boolean) {
    this.olFeature.setStyle(visible ? null : []);
    this.layer.animateFeature(this, visible);
  }
}

AlloyAnimatedFeature.prototype.allowsSelection = true;
AlloyAnimatedFeature.prototype.allowsHover = false;
