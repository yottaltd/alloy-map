import { AlloyDrawFeature } from '@/map/features/AlloyDrawFeature';
import { AlloyDrawFeatureProperties } from '@/map/features/AlloyDrawFeatureProperties';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { ProjectionUtils } from '@/utils/ProjectionUtils';
import OLFeature from 'ol/Feature';

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
    geoJson: Record<string, unknown>,
  ): AlloyDrawFeature {
    return new AlloyDrawFeature(
      id,
      new OLFeature(ProjectionUtils.GEOJSON.readGeometry(geoJson)),
      properties,
    );
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
