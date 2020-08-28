import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyFeatureType } from '@/map/features/AlloyFeatureType';
// eslint-disable-next-line max-len
import { AlloyPathNodeConnectorFeatureProperties } from '@/map/features/AlloyPathNodeConnectorFeatureProperties';
import { FeatureUtils } from '@/utils/FeatureUtils';
import { ProjectionUtils } from '@/utils/ProjectionUtils';
import { LineString } from 'geojson';
import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';

/**
 * an alloy path node connector feature which represents a single line connector
 * @ignore
 * @internal
 */
export class AlloyPathNodeConnectorFeature implements AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.Connector; // see end of file for prototype

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
  public originatingLayerId!: undefined; // see end of file for prototype

  /**
   * @implements
   */
  public readonly id: string;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public readonly olFeature: OLFeature;

  /**
   * the cached properties of the alloy cable feature
   */
  public readonly properties: Readonly<AlloyPathNodeConnectorFeatureProperties>;

  /**
   * creates a new instance
   * @param id the id of the feature
   * @param olFeature the underlying openlayers feature
   * @param properties the properties bundled with the service call
   * @ignore
   * @internal
   */
  constructor(
    id: string,
    olFeature: OLFeature,
    properties: AlloyPathNodeConnectorFeatureProperties,
  ) {
    this.id = id;
    this.olFeature = olFeature;
    this.properties = properties;

    // set the id of the feature on the ol feature
    FeatureUtils.setFeatureIdForOlFeature(olFeature, id);
  }

  /**
   * get the "expected" geometry of the alloy cable, this is assumed based on its type
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
AlloyPathNodeConnectorFeature.prototype.type = AlloyFeatureType.Connector;
AlloyPathNodeConnectorFeature.prototype.allowsSelection = false;
AlloyPathNodeConnectorFeature.prototype.allowsHover = false;
AlloyPathNodeConnectorFeature.prototype.originatingLayerId = undefined;
