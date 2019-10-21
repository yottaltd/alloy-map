import { Geometry } from 'geojson';
import OLFeature from 'ol/Feature';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import { FeatureUtils, OL_FEATURE_TO_FEATURE_ID } from '../../utils/FeatureUtils';
import { ProjectionUtils } from '../../utils/ProjectionUtils';
import { WfsFeatureProperty } from '../../wfs/WfsFeatureProperty';
import { AlloyWfsLayer } from '../layers/wfs/AlloyWfsLayer';
import { AlloyFeature } from './AlloyFeature';
import { AlloyFeatureType } from './AlloyFeatureType';
import { AlloyWfsFeatureProperties } from './AlloyWfsFeatureProperties';

/**
 * an alloy wfs feature
 */
export class AlloyWfsFeature implements AlloyFeature {
  /**
   * @implements
   */
  public type!: AlloyFeatureType.Wfs; // see end of file for prototype

  /**
   * @implements
   */
  public allowsSelection!: true; // see end of file for prototype

  /**
   * @implements
   */
  public allowsHover!: true; // see end of file for prototype

  /**
   * @implements
   */
  public readonly id: string;

  /**
   * @ignore
   * @internal
   */
  public readonly styleId: string;

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
   * the properties for the wfs feature
   */
  public readonly properties: Readonly<AlloyWfsFeatureProperties>;

  /**
   * @ignore
   * @internal
   */
  private readonly originatingLayer: AlloyWfsLayer;

  /**
   * creates a new instance
   * @param id the id of the feature
   * @param olFeature the underlying openlayers feature
   * @param properties the properties bundled with the service call
   * @param originatingLayerId the layer id that the item originated from
   * @param styleId the style id it relates to
   * @ignore
   * @internal
   */
  public constructor(
    id: string,
    olFeature: OLFeature,
    properties: AlloyWfsFeatureProperties,
    originatingLayer: AlloyWfsLayer,
    styleId: string,
  ) {
    this.id = id;
    this.olFeature = olFeature;
    this.properties = properties;
    this.originatingLayer = originatingLayer;
    this.originatingLayerId = originatingLayer.id;
    this.styleId = styleId;

    // set the id of the feature on the ol feature
    FeatureUtils.setFeatureIdForOlFeature(olFeature, id);
  }

  /**
   * Gets all property values for this WFS feature
   * @returns array of `WfsFeatureProperty`
   */
  public getWfsProperties(): WfsFeatureProperty[] {
    const wfsProperties: WfsFeatureProperty[] = [];
    const descriptions = this.originatingLayer.getWfsDescriptionForFeature(this);
    const olFeatureProperties = this.olFeature.getProperties();
    const olFeaturePropertiesKeys = Object.keys(olFeatureProperties);
    for (const key of olFeaturePropertiesKeys) {
      if (key === OL_FEATURE_TO_FEATURE_ID || key === 'geometry') {
        continue;
      }
      if (descriptions === null || descriptions.size === 0 || descriptions.has(key)) {
        wfsProperties.push({
          name: key,
          value: olFeatureProperties[key],
          description: descriptions ? descriptions.get(key) : undefined,
        });
      }
    }
    if (descriptions) {
      for (const descriptionKey of Array.from(descriptions.keys())) {
        if (olFeaturePropertiesKeys.indexOf(descriptionKey) < 0) {
          const description = descriptions.get(descriptionKey);
          if (description && description.nillable) {
            wfsProperties.push({
              name: descriptionKey,
              description,
            });
          }
        }
      }
    }
    return wfsProperties;
  }

  /**
   * get the "expected" geometry of the alloy wfs feature, this is assumed based on its type
   * @ignore
   * @internal
   */
  public getExpectedGeometry():
    | OLPoint
    | OLMultiPoint
    | OLLineString
    | OLMultiLineString
    | OLPolygon
    | OLMultiPolygon
    | OLGeometryCollection {
    // naughty cast here but we are expecting the geometry to always be of one of the above types
    // the reason we don't check is down to performance
    return this.olFeature.getGeometry() as any;
  }

  /**
   * @implements
   */
  public setGeometry(geometry: Geometry | null) {
    if (geometry === null) {
      this.olFeature.setGeometry(undefined as any);
    } else {
      // allows any type
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
AlloyWfsFeature.prototype.type = AlloyFeatureType.Wfs;
AlloyWfsFeature.prototype.allowsSelection = true;
AlloyWfsFeature.prototype.allowsHover = true;
