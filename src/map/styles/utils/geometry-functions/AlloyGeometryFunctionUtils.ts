import * as _ from 'lodash';
import OLFeature from 'ol/Feature';
import OLGeometry from 'ol/geom/Geometry';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import OLRenderFeature from 'ol/render/Feature';
import { AlloyMapError } from '../../../../error/AlloyMapError';

/**
 * utility for geometry functions
 * @ignore
 */
export abstract class AlloyGeometryFunctionUtils {
  /**
   * pipes a series of geometry function commands into the next
   * @param from the starting call expecting an open layers feature
   * @param to the array of subsequent geometry functions to apply one after the other
   */
  public static pipe(
    from: (olFeature: OLFeature | OLRenderFeature) => OLGeometry,
    ...to: Array<(olGeometry: OLGeometry) => OLGeometry>
  ): (olFeature: OLFeature | OLRenderFeature) => OLGeometry {
    return (olFeature: OLFeature | OLRenderFeature) =>
      to.reduce((prev, curr) => curr(prev), from(olFeature));
  }

  /**
   * converts a geometry object to a single multipoint, works recursively for collections
   * @param geometry the geometry to convert to multi point
   */
  public static convertGeometryToMultiPoint(geometry: OLGeometry): OLMultiPoint {
    switch (geometry.getType()) {
      case 'GeometryCollection':
        const points: Array<[number, number]> = _.flatten(
          (geometry as OLGeometryCollection)
            .getGeometries()
            .map((g) => AlloyGeometryFunctionUtils.convertGeometryToMultiPoint(g).getCoordinates()),
        );
        return new OLMultiPoint(points);
      case 'LineString':
        return new OLMultiPoint((geometry as OLLineString).getCoordinates());
      case 'MultiLineString':
        return new OLMultiPoint(_.flatten((geometry as OLMultiLineString).getCoordinates()));
      case 'Point':
        return new OLMultiPoint([(geometry as OLPoint).getCoordinates()]);
      case 'MultiPoint':
        return new OLMultiPoint((geometry as OLMultiPoint).getCoordinates());
      case 'Polygon':
        return new OLMultiPoint(_.flatten((geometry as OLPolygon).getCoordinates()));
      case 'MultiPolygon':
        return new OLMultiPoint(
          _.flatten(_.flatten((geometry as OLMultiPolygon).getCoordinates())),
        );
      default:
        throw new AlloyMapError(
          1556029066,
          'unhandled geometry type, cannot convert to multi point',
        );
    }
  }

  /**
   * converts a geometry object to an array of simple geometries 'Point' | 'LineString' | 'Polygon'
   * works recursively for collections
   * @param geometry the geometry to convert to simple geometries
   */
  public static convertGeometryToSimpleGeometries(geometry: OLGeometry): OLGeometry[] {
    switch (geometry.getType()) {
      case 'GeometryCollection':
        return _.flatten(
          (geometry as OLGeometryCollection)
            .getGeometries()
            .map(AlloyGeometryFunctionUtils.convertGeometryToSimpleGeometries),
        );
      case 'MultiLineString':
        return (geometry as OLMultiLineString).getLineStrings();
      case 'MultiPoint':
        return (geometry as OLMultiPoint).getPoints();
      case 'MultiPolygon':
        return (geometry as OLMultiPolygon).getPolygons();
      case 'LineString':
      case 'Point':
      case 'Polygon':
        return [geometry];
      default:
        throw new AlloyMapError(
          1556211290,
          `unhandled geometry type ${geometry.getType()}, cannot convert to simple geometry`,
        );
    }
  }
}
