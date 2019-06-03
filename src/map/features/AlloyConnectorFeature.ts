import { LineString } from 'geojson';
import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';
import { FeatureUtils } from '../../utils/FeatureUtils';
import { ProjectionUtils } from '../../utils/ProjectionUtils';
import { AlloyConnectorFeatureProperties } from './AlloyConnectorFeatureProperties';
import { AlloyFeature } from './AlloyFeature';
import { AlloyFeatureType } from './AlloyFeatureType';

/**
 * an alloy connector feature which represents a connector with single line string geometry
 * @ignore
 * @internal
 */
export class AlloyConnectorFeature implements AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.Connector; // see end of file for prototype

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
   * the cached properties of the alloy cable feature
   */
  public readonly properties: Readonly<AlloyConnectorFeatureProperties>;

  /**
   * creates a new instance
   * @param id the id of the feature
   * @param olFeature the underlying openlayers feature
   * @param properties the properties bundled with the service call
   * @ignore
   * @internal
   */
  constructor(id: string, olFeature: OLFeature, properties: AlloyConnectorFeatureProperties) {
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

/**
 * we are prototyping this property because it is the same on every single instance of this class.
 * there is no built in typescript way to define this without it being turned into an initialised
 * property (set on each constructor) and due to the frequency that these objects are created we
 * really need every small optimisation we can get with regard to features
 */
AlloyConnectorFeature.prototype.type = AlloyFeatureType.Connector;
AlloyConnectorFeature.prototype.allowsSelection = false;
AlloyConnectorFeature.prototype.allowsHover = false;
