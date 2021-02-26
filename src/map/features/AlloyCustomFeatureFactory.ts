import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
import { AlloyCustomFeature } from '@/map/features/AlloyCustomFeature';
import { AlloyCustomFeatureProperties } from '@/map/features/AlloyCustomFeatureProperties';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { ProjectionUtils } from '@/utils/ProjectionUtils';
import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';

/**
 * factory for creating custom features
 */
export abstract class AlloyCustomFeatureFactory {
  /**
   * creates a new instance with point geometry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param customLayerId the custom layer this feature was created for
   * @param coordinate the coordinate of the geometry
   */
  public static createPoint(
    id: string,
    properties: AlloyCustomFeatureProperties,
    customLayerId: string,
    coordinate: AlloyCoordinate,
  ): AlloyCustomFeature {
    return new AlloyCustomFeature(
      id,
      new OLFeature(new OLPoint(coordinate.toMapCoordinate())),
      properties,
      customLayerId,
    );
  }

  /**
   * creates a new instance with multi point geometry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param customLayerId the custom layer this feature was created for
   * @param coordinates the coordinates of the geometry
   */
  public static createMultiPoint(
    id: string,
    properties: AlloyCustomFeatureProperties,
    customLayerId: string,
    coordinates: AlloyCoordinate[],
  ): AlloyCustomFeature {
    return new AlloyCustomFeature(
      id,
      new OLFeature(new OLMultiPoint(coordinates.map((c) => c.toMapCoordinate()))),
      properties,
      customLayerId,
    );
  }

  /**
   * creates a new instance with line string geometry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param customLayerId the custom layer this feature was created for
   * @param coordinates the coordinates of the geometry
   */
  public static createLineString(
    id: string,
    properties: AlloyCustomFeatureProperties,
    customLayerId: string,
    coordinates: AlloyCoordinate[],
  ): AlloyCustomFeature {
    return new AlloyCustomFeature(
      id,
      new OLFeature(new OLLineString(coordinates.map((c) => c.toMapCoordinate()))),
      properties,
      customLayerId,
    );
  }

  /**
   * creates a new instance with multi line string geometry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param customLayerId the custom layer this feature was created for
   * @param coordinates the coordinates of the geometry
   */
  public static createMultiLineString(
    id: string,
    properties: AlloyCustomFeatureProperties,
    customLayerId: string,
    coordinates: AlloyCoordinate[][],
  ): AlloyCustomFeature {
    return new AlloyCustomFeature(
      id,
      new OLFeature(
        new OLMultiLineString(coordinates.map((p) => p.map((c) => c.toMapCoordinate()))),
      ),
      properties,
      customLayerId,
    );
  }

  /**
   * creates a new instance with polygon geometry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param customLayerId the custom layer this feature was created for
   * @param coordinates the coordinates of the geometry
   */
  public static createPolygon(
    id: string,
    properties: AlloyCustomFeatureProperties,
    customLayerId: string,
    coordinates: AlloyCoordinate[][],
  ): AlloyCustomFeature {
    return new AlloyCustomFeature(
      id,
      new OLFeature(new OLPolygon(coordinates.map((p) => p.map((c) => c.toMapCoordinate())))),
      properties,
      customLayerId,
    );
  }

  /**
   * creates a new instance with multi polygon geometry
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param customLayerId the custom layer this feature was created for
   * @param coordinates the coordinates of the geometry
   */
  public static createMultiPolygon(
    id: string,
    properties: AlloyCustomFeatureProperties,
    customLayerId: string,
    coordinates: AlloyCoordinate[][][],
  ): AlloyCustomFeature {
    return new AlloyCustomFeature(
      id,
      new OLFeature(
        new OLMultiPolygon(coordinates.map((o) => o.map((p) => p.map((c) => c.toMapCoordinate())))),
      ),
      properties,
      customLayerId,
    );
  }

  /**
   * creates a new instance from a geo json object
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param customLayerId the custom layer this feature was created for
   * @param geoJson the geojson object or string to process
   */
  public static createFromGeoJson(
    id: string,
    properties: AlloyCustomFeatureProperties,
    customLayerId: string,
    geoJson: string | Record<string, unknown>,
  ): AlloyCustomFeature {
    if (!geoJson) {
      throw new AlloyMapError(1559559645, 'geo json parameter must be defined');
    }

    return new AlloyCustomFeature(
      id,
      new OLFeature(ProjectionUtils.GEOJSON.readGeometry(geoJson)),
      properties,
      customLayerId,
    );
  }

  /**
   * creates a new instance from an existing map feature
   * @param id the id of the feature, must be unique in the layer
   * @param properties the properties of the custom feature
   * @param customLayerId the custom layer this feature was created for
   * @param feature the feature to copy geometry from
   */
  public static createFromFeature(
    id: string,
    properties: AlloyCustomFeatureProperties,
    customLayerId: string,
    feature: AlloyFeature,
  ): AlloyCustomFeature {
    return new AlloyCustomFeature(
      id,
      new OLFeature(feature.olFeature.clone().getGeometry()),
      properties,
      customLayerId,
    );
  }
}
