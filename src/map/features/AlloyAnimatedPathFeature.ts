import { AlloyAnimationManager } from '@/map/animations/AlloyAnimationManager';
// eslint-disable-next-line max-len
import { AlloyAnimatedPathFeatureProperties } from '@/map/features/AlloyAnimatedPathFeatureProperties';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';
import { FeatureUtils } from '@/utils/FeatureUtils';
import { ProjectionUtils } from '@/utils/ProjectionUtils';
import { LineString } from 'geojson';
import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';

/**
 * an alloy animated path feature which represents an animated path with single line string geometry
 */
export abstract class AlloyAnimatedPathFeature extends AlloyFeature {
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
   * the cached properties of the alloy animated path feature
   */
  public readonly properties: Readonly<AlloyAnimatedPathFeatureProperties>;

  /**
   * Animation manager used to animate this feature
   */
  private readonly animationManager: AlloyAnimationManager;

  /**
   * creates a new instance
   * @param id the id of the feature
   * @param olFeature the underlying openlayers feature
   * @param properties the properties bundled with the service call
   * @param animationManager the animation manager used for this feature
   * @param layerId the id of layer that the item is added to
   * @ignore
   * @internal
   */
  constructor(
    id: string,
    olFeature: OLFeature,
    properties: AlloyAnimatedPathFeatureProperties,
    animationManager: AlloyAnimationManager,
    layerId: string,
  ) {
    super();
    this.id = id;
    this.olFeature = olFeature;
    this.properties = properties;
    this.animationManager = animationManager;
    this.originatingLayerId = layerId;

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
    this.animationManager.stopAnimation(this);
    if (geometry === null) {
      this.olFeature.setGeometry(undefined);
    } else {
      this.olFeature.setGeometry(ProjectionUtils.GEOJSON.readGeometry(geometry));
      this.animationManager.startAnimation(this);
    }
  }

  /**
   * @implements
   */
  public setVisible(visible: boolean) {
    this.olFeature.setStyle(visible ? null : []);
    if (visible) {
      this.animationManager.startAnimation(this);
    } else {
      this.animationManager.stopAnimation(this);
    }
  }
}

AlloyAnimatedPathFeature.prototype.allowsSelection = false;
AlloyAnimatedPathFeature.prototype.allowsHover = false;
