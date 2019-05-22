import OLFeature from 'ol/Feature';
import OLStyle from 'ol/style/Style';
import { FeatureUtils } from '../../utils/FeatureUtils';
// tslint:disable-next-line: max-line-length
import { AlloyGeometryFunctionUtils } from '../styles/utils/geometry-functions/AlloyGeometryFunctionUtils';
import { AlloyDrawFeatureProperties } from './AlloyDrawFeatureProperties';
import { AlloyFeature } from './AlloyFeature';
import { AlloyFeatureType } from './AlloyFeatureType';
import { Geometry } from 'geojson';
import { ProjectionUtils } from '../../utils/ProjectionUtils';

/**
 * an alloy draw feature which represents something being drawn on the map by a user or
 * added programatically, it can represent anything
 */
export class AlloyDrawFeature implements AlloyFeature {
  /**
   * creates alloy draw features from an alloy feature, this will break the feature apart into a
   * feature per simple geometry
   * @param feature the feature to create draw features for
   * @param properties the properties to assign the feature
   */
  public static fromAlloyFeature(
    feature: AlloyFeature,
    properties: AlloyDrawFeatureProperties,
  ): AlloyDrawFeature[] {
    // if its already a draw feature we're good to go
    if (feature instanceof AlloyDrawFeature) {
      return [feature];
    }

    // breaks apart a features geometry into its individual geoms
    const geometries = AlloyGeometryFunctionUtils.convertGeometryToSimpleGeometries(
      feature.olFeature.getGeometry(),
    );

    // create a new feature for each
    const features: AlloyDrawFeature[] = [];
    for (const geometry of geometries) {
      features.push(new AlloyDrawFeature(uuid.v1(), new OLFeature(geometry), properties));
    }

    return features;
  }

  /**
   * @implements
   */
  public type!: AlloyFeatureType.Draw; // see end of file for prototype

  /**
   * @implements
   */
  public readonly id: string;

  /**
   * @implements
   * @ignore
   */
  public readonly olFeature: OLFeature;

  /**
   * @implements
   * @ignore
   */
  public readonly allowsSelection: boolean = false;

  /**
   * @implements
   * @ignore
   */
  public readonly allowsHover: boolean = true;

  /**
   * @implements
   * @ignore
   */
  public readonly originatingLayerId?: string;

  /**
   * the properties for the draw feature
   */
  public readonly properties: Readonly<AlloyDrawFeatureProperties>;

  /**
   * creates a new instance
   * @param id the id of the feature
   * @param olFeature the underlying openlayers feature
   * @param properties the properties of the feature
   */
  constructor(id: string, olFeature: OLFeature, properties: AlloyDrawFeatureProperties) {
    this.id = id;
    this.olFeature = olFeature;
    this.properties = properties;
    this.originatingLayerId = properties.originatingLayerId;

    // set the id of the feature on the ol feature
    FeatureUtils.setFeatureIdForOlFeature(olFeature, id);
  }

  /**
   * Sets geometry of the underlying alloy feature
   * @param geometry geometry to set for feature
   */
  public setGeometry(geometry: Geometry) {
    this.olFeature.setGeometry(ProjectionUtils.GEOJSON.readGeometry(geometry));
  }

  /**
   * Sets style of the alloy feature
   * @param style styles to sets on feature
   */
  public setStyle(style: OLStyle | OLStyle[] | null) {
    this.olFeature.setStyle(style);
  }
}

/**
 * we are prototyping this property because it is the same on every single instance of this class.
 * there is no built in typescript way to define this without it being turned into an initialised
 * property (set on each constructor) and due to the frequency that these objects are created we
 * really need every small optimisation we can get with regard to features
 */
AlloyDrawFeature.prototype.type = AlloyFeatureType.Draw;
