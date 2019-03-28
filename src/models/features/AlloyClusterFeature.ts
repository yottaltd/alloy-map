import OLFeature from 'ol/Feature';
import OLPoint from 'ol/geom/Point';
import { AlloyClusterFeatureProperties } from './AlloyClusterFeatureProperties';
import { AlloyFeature } from './AlloyFeature';
import { AlloyFeatureType } from './AlloyFeatureType';

/**
 * an alloy cluster feature which represents several items "clustered" together based on proximity
 */
export class AlloyClusterFeature implements AlloyFeature {
  public readonly type = AlloyFeatureType.Cluster;
  public readonly olFeature: OLFeature;

  /**
   * the cached properties of the alloy cluster feature
   */
  public readonly properties: Readonly<AlloyClusterFeatureProperties>;

  /**
   * creates a new instance
   * @param olFeature the underlying openlayers feature
   * @param properties the properties bundled with the service call
   */
  constructor(olFeature: OLFeature, properties: AlloyClusterFeatureProperties) {
    this.olFeature = olFeature;
    this.properties = properties;
  }

  /**
   * get the "expected" geometry of the alloy cluster, this is assumed based on its type
   */
  public getExpectedGeometry(): OLPoint {
    // naughty cast here but we are expecting the geometry to always be a Point
    return this.olFeature.getGeometry() as OLPoint;
  }
}
