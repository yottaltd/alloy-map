import { Geometry } from 'geojson';
import OLFeature from 'ol/Feature';
import OLPoint from 'ol/geom/Point';
import { AlloyMapError } from '../../error/AlloyMapError';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { AlloyFeature } from './AlloyFeature';
import { AlloyFeatureType } from './AlloyFeatureType';
import { AlloyHeatmapClusterFeatureProperties } from './AlloyHeatmapClusterFeatureProperties';

/**
 * an alloy cluster feature which represents several items "clustered" together based on proximity
 */
export class AlloyHeatmapClusterFeature implements AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.HeatmapCluster; // see end of file for prototype

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
   * the cached properties of the alloy cluster feature
   */
  public readonly properties: Readonly<AlloyHeatmapClusterFeatureProperties>;

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
    properties: AlloyHeatmapClusterFeatureProperties,
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
   * get the "expected" geometry of the alloy cluster, this is assumed based on its type
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
  public setGeometry(geometry: Geometry | null) {
    throw new AlloyMapError(1559223891, 'modifying geometry of cluster features is not allowed');
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
AlloyHeatmapClusterFeature.prototype.type = AlloyFeatureType.HeatmapCluster;
AlloyHeatmapClusterFeature.prototype.allowsSelection = false;
AlloyHeatmapClusterFeature.prototype.allowsHover = false;
