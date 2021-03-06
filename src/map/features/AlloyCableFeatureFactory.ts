import { AlloyCableFeature } from '@/map/features/AlloyCableFeature';
import { AlloyCableFeatureProperties } from '@/map/features/AlloyCableFeatureProperties';
import { AlloyCableUnitFeature } from '@/map/features/AlloyCableUnitFeature';
import { AlloyCableUnitFeatureProperties } from '@/map/features/AlloyCableUnitFeatureProperties';
import { AlloyCableLayer } from '@/map/layers/cable/AlloyCableLayer';
import { ProjectionUtils } from '@/utils/ProjectionUtils';
import { LineString, Point } from 'geojson';
import OLFeature from 'ol/Feature';

/**
 * factory for creating cable features
 */
export abstract class AlloyCableFeatureFactory {
  /**
   * creates a new cable instance from a line geoemtry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param geometry the geojson LineString object
   * @param customLayerId the custom layer this feature was created for
   */
  public static createCable(
    id: string,
    properties: AlloyCableFeatureProperties,
    geometry: LineString,
    layer: AlloyCableLayer,
  ): AlloyCableFeature {
    return new AlloyCableFeature(
      id,
      new OLFeature(ProjectionUtils.GEOJSON.readGeometry(geometry)),
      properties,
      layer.animationManager,
      layer.id,
    );
  }

  /**
   * creates a new cable unit instance from a point geoemtry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param geometry the geojson Point object
   */
  public static createCableUnit(
    id: string,
    properties: AlloyCableUnitFeatureProperties,
    geometry: Point,
  ): AlloyCableUnitFeature {
    return new AlloyCableUnitFeature(
      id,
      new OLFeature(ProjectionUtils.GEOJSON.readGeometry(geometry)),
      properties,
    );
  }
}
