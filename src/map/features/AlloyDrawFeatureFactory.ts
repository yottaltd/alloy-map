import OLFeature from 'ol/Feature';
import OLGeoJson from 'ol/format/GeoJSON';
import { ProjectionUtils } from '../../utils/ProjectionUtils';
import { AlloyDrawFeature } from './AlloyDrawFeature';
import { AlloyDrawFeatureProperties } from './AlloyDrawFeatureProperties';
import { AlloyFeature } from './AlloyFeature';

/**
 * the geo json formatter to convert geometry
 * @ignore
 */
const GEOJSON = new OLGeoJson({
  // the projection to convert the data into (should match the layer)
  featureProjection: ProjectionUtils.MAP_PROJECTION,
  // the projection the data is expected to be in
  defaultDataProjection: ProjectionUtils.API_PROJECTION,
});

/**
 * factory for creating draw features
 */
export abstract class AlloyDrawFeatureFactory {
  /**
   * creates a new instance from a geo json object
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param geoJson the geojson object or string to process
   */
  public static createFromGeoJson(
    id: string,
    properties: AlloyDrawFeatureProperties,
    geoJson: any,
  ): AlloyDrawFeature {
    return new AlloyDrawFeature(id, new OLFeature(GEOJSON.readGeometry(geoJson)), properties);
  }

  /**
   * creates a new instance from an existing map feature
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the draw feature
   * @param feature the feature to copy geometry from
   */
  public static createFromFeature(
    id: string,
    properties: AlloyDrawFeatureProperties,
    feature: AlloyFeature,
  ): AlloyDrawFeature {
    return new AlloyDrawFeature(
      id,
      new OLFeature(feature.olFeature.clone().getGeometry()),
      properties,
    );
  }
}
