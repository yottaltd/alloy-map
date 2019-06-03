import { LineString, Point } from 'geojson';
import OLFeature from 'ol/Feature';
import { ProjectionUtils } from '../../utils/ProjectionUtils';
import { AlloyRouteFeature } from './AlloyRouteFeature';
import { AlloyRouteFeatureProperties } from './AlloyRouteFeatureProperties';
import { AlloyRouteWaypointFeature } from './AlloyRouteWaypointFeature';
import { AlloyRouteWaypointFeatureProperties } from './AlloyRouteWaypointFeatureProperties';
import { AlloyRouteLayer } from '../layers/route/AlloyRouteLayer';

/**
 * factory for creating route features
 * @ignore
 * @internal
 */
export abstract class AlloyRouteFeatureFactory {
  /**
   * creates a new Route instance from a line geoemtry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param geometry the geojson LineString object
   * @param customLayerId the custom layer this feature was created for
   * @ignore
   * @internal
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
      layer,
    );
  }

  /**
   * creates a new Route waypoint instance from a point geoemtry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param geometry the geojson Point object
   * @ignore
   * @internal
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
