import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyBounds } from '@/map/core/AlloyBounds';
import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyClusterFeatureProperties } from '@/map/features/AlloyClusterFeatureProperties';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';
import { FeatureUtils } from '@/utils/FeatureUtils';
import { Geometry } from 'geojson';
import OLFeature from 'ol/Feature';
import OLPoint from 'ol/geom/Point';

/**
 * an alloy cluster feature which represents several items "clustered" together based on proximity
 */
export class AlloyClusterFeature implements AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.Cluster; // see end of file for prototype

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
  public allowsHover!: true; // see end of file for prototype

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
  public readonly properties: Readonly<AlloyClusterFeatureProperties>;

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
    properties: AlloyClusterFeatureProperties,
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
   * @implements
   * @ignore
   * @internal
   */
  public onSelectionInteraction(map: AlloyMap): void {
    const bbox = this.properties.bbox;
    map.setViewport(
      new AlloyBounds(
        new AlloyCoordinate(bbox.lonMin, bbox.latMin),
        new AlloyCoordinate(bbox.lonMax, bbox.latMax),
      ),
      true,
    );
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
  public setGeometry(geometry: Geometry | null): void {
    throw new AlloyMapError(1559223891, 'modifying geometry of cluster features is not allowed');
  }

  /**
   * @implements
   */
  public setVisible(visible: boolean): void {
    this.olFeature.setStyle(visible ? null : []);
  }
}

/**
 * we are prototyping this property because it is the same on every single instance of this class.
 * there is no built in typescript way to define this without it being turned into an initialised
 * property (set on each constructor) and due to the frequency that these objects are created we
 * really need every small optimisation we can get with regard to features
 */
AlloyClusterFeature.prototype.type = AlloyFeatureType.Cluster;
AlloyClusterFeature.prototype.allowsSelection = false;
AlloyClusterFeature.prototype.allowsHover = true;
