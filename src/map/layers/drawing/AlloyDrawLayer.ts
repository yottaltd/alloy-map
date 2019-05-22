import OLGeometry from 'ol/geom/Geometry';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import OLFeature from 'ol/Feature';
import OLGeoJson from 'ol/format/GeoJSON';
import * as uuid from 'uuid';
import {
  Geometry,
  GeometryCollection,
  Point,
  MultiPolygon,
  Polygon,
  MultiPoint,
  LineString,
  MultiLineString,
} from 'geojson';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyDrawFeature } from '../../features/AlloyDrawFeature';
// tslint:disable-next-line: max-line-length
import { AlloyDrawInteractionGeometryType } from '../../interactions/AlloyDrawInteractionGeometryType';
import { AlloyLayerWithFeatures } from '../AlloyLayerWithFeatures';
import { AlloyDrawLayerOptions } from './AlloyDrawLayerOptions';
import { AlloyDrawStyleProcessor } from './AlloyDrawStyleProcessor';
import { AlloyDrawFeatureProperties } from '../../features/AlloyDrawFeatureProperties';
import { AlloyFeature } from '../../features/AlloyFeature';
// tslint:disable-next-line: max-line-length
import { AlloyGeometryFunctionUtils } from '../../styles/utils/geometry-functions/AlloyGeometryFunctionUtils';
import { ProjectionUtils } from '../../../utils/ProjectionUtils';

const GEOJSON = new OLGeoJson({
  // the projection to convert the data into (should match the layer)
  featureProjection: ProjectionUtils.MAP_PROJECTION,
  // the projection the data is expected to be in
  defaultDataProjection: ProjectionUtils.API_PROJECTION,
});

/**
 * an alloy draw layer for rendering features that have been drawn on the map, use this to
 * add draw features onto the map and manage them from draw interaction
 * @ignore
 */
export class AlloyDrawLayer extends AlloyLayerWithFeatures<AlloyDrawFeature> {
  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyDrawLayerOptions) {
    super(AlloyDrawLayer.name + ':' + uuid.v1(), options.map, AlloyLayerZIndex.Drawing);

    // initialised here because style processor need some of the above internal properties
    this.setStyleProcessor(new AlloyDrawStyleProcessor(this));
  }

  /**
   * @override
   */
  public addFeature(feature: AlloyDrawFeature): boolean {
    // this is the copy of the super.addFeature
    // minus the adding feature to source,
    // since that will be handled by draw interaction once it's ready (shitty timeouts)

    if (this.currentFeatures.has(feature.id)) {
      this.debugger('feature: %s already exists in layer', feature.id);
      return false;
    }

    this.debugger('adding feature: %s', feature.id);
    this.currentFeatures.set(feature.id, feature);
    return true;
  }

  /**
   * Combine all features' geometries in this layer into a single geometry
   * @return single openlayers geometry of all features in the layer
   */
  public getAllFeaturesGeometry(): Geometry {
    const geometries: OLGeometry[] = this.olSource
      .getFeatures()
      .map((feature) => feature.getGeometry());
    let geom: OLGeometry | undefined;
    if (geometries.length === 1) {
      geom = geometries[0];
    } else if (geometries.length > 1) {
      // check if all the same type and create a Multi-geoemtry
      if (geometries.every((g) => g.getType() === geometries[0].getType())) {
        switch (geometries[0].getType()) {
          case AlloyDrawGeometryType.Point:
            geom = new OLMultiPoint((geometries as OLPoint[]).map((g) => g.getCoordinates()));
            break;
          case AlloyDrawGeometryType.LineString:
            geom = new OLMultiLineString(
              (geometries as OLLineString[]).map((g) => g.getCoordinates()),
            );
            break;
          case AlloyDrawGeometryType.Polygon:
            geom = new OLMultiPolygon((geometries as OLPolygon[]).map((g) => g.getCoordinates()));
            break;
          default:
            throw new AlloyMapError(
              1556196597,
              `Unhandled geometry type ${geometries[0].getType()} in drawing layer`,
            );
        }
      }
      // otherwise wrap all in multi-collection
      geom = new OLGeometryCollection(geometries);
    }

    if (geom) {
      return GEOJSON.writeGeometryObject(geom) as any;
    }

    throw new AlloyMapError(1556196189, 'No geometries found in draw layer');
  }
}
