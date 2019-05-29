import { Geometry } from 'geojson';
import OLGeometry from 'ol/geom/Geometry';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import * as uuid from 'uuid';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { ProjectionUtils } from '../../../utils/ProjectionUtils';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyDrawFeature } from '../../features/AlloyDrawFeature';
// tslint:disable-next-line: max-line-length
import { AlloyDrawInteractionGeometryType } from '../../interactions/AlloyDrawInteractionGeometryType';
import { AlloyLayerWithFeatures } from '../AlloyLayerWithFeatures';
import { AlloyDrawLayerOptions } from './AlloyDrawLayerOptions';
import { AlloyDrawStyleProcessor } from './AlloyDrawStyleProcessor';

/**
 * an alloy draw layer for rendering features that have been drawn on the map, use this to
 * add draw features onto the map and manage them from draw interaction
 * @ignore
 * @internal
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

    // special case for no geometry
    if (geometries.length === 0) {
      throw new AlloyMapError(1556196189, 'No geometries found in draw layer');
    }

    // collect the geometry
    let geom: OLGeometry = geometries[0]; // assign the first geometry

    // if we have multiple, we need some processing
    if (geometries.length > 1) {
      // check if all the same type and create a Multi-geometry
      const firstType = geometries[0].getType();
      if (geometries.every((g) => g.getType() === firstType)) {
        switch (firstType) {
          case AlloyDrawInteractionGeometryType.Point:
            geom = new OLMultiPoint((geometries as OLPoint[]).map((g) => g.getCoordinates()));
            break;
          case AlloyDrawInteractionGeometryType.LineString:
            geom = new OLMultiLineString(
              (geometries as OLLineString[]).map((g) => g.getCoordinates()),
            );
            break;
          case AlloyDrawInteractionGeometryType.Polygon:
            geom = new OLMultiPolygon((geometries as OLPolygon[]).map((g) => g.getCoordinates()));
            break;
          default:
            throw new AlloyMapError(
              1556196597,
              `Unhandled geometry type ${geometries[0].getType()} in drawing layer`,
            );
        }
      } else {
        // otherwise wrap all in multi-collection
        geom = new OLGeometryCollection(geometries);
      }
    }

    return ProjectionUtils.GEOJSON.writeGeometryObject(geom) as any;
  }
}
