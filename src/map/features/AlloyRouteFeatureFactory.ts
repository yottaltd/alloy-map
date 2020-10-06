import { AlloyRouteFeature } from '@/map/features/AlloyRouteFeature';
import { AlloyRouteFeatureProperties } from '@/map/features/AlloyRouteFeatureProperties';
import { AlloyRouteWaypointFeature } from '@/map/features/AlloyRouteWaypointFeature';
// eslint-disable-next-line max-len
import { AlloyRouteWaypointFeatureProperties } from '@/map/features/AlloyRouteWaypointFeatureProperties';
import { AlloyRouteLayer } from '@/map/layers/route/AlloyRouteLayer';
import { ProjectionUtils } from '@/utils/ProjectionUtils';
import { LineString, Point } from 'geojson';
import OLFeature from 'ol/Feature';

/**
 * factory for creating route features
 */
export abstract class AlloyRouteFeatureFactory {
  /**
   * creates a new Route instance from a line geoemtry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param geometry the geojson LineString object
   * @param customLayerId the custom layer this feature was created for
   */
  public static createRoute(
    id: string,
    properties: AlloyRouteFeatureProperties,
    geometry: LineString,
    layer: AlloyRouteLayer,
  ): AlloyRouteFeature {
    return new AlloyRouteFeature(
      id,
      new OLFeature(ProjectionUtils.GEOJSON.readGeometry(geometry)),
      properties,
      layer.animationManager,
      layer.id,
    );
  }

  /**
   * creates a new Route waypoint instance from a point geoemtry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param geometry the geojson Point object
   */
  public static createRouteWaypoint(
    id: string,
    properties: AlloyRouteWaypointFeatureProperties,
    geometry: Point,
  ): AlloyRouteWaypointFeature {
    return new AlloyRouteWaypointFeature(
      id,
      new OLFeature(ProjectionUtils.GEOJSON.readGeometry(geometry)),
      properties,
    );
  }
}
