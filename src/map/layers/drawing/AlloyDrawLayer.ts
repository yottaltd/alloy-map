import OLGeometry from 'ol/geom/Geometry';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import OLFeature from 'ol/Feature';
import * as uuid from 'uuid';
import { AlloyMapError } from '../../../error/AlloyMapError';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyDrawFeature } from '../../features/AlloyDrawFeature';
import { AlloyDrawGeometryType } from '../../interactions/AlloyDrawInteraction';
import { AlloyLayerWithFeatures } from '../AlloyLayerWithFeatures';
import { AlloyDrawLayerOptions } from './AlloyDrawLayerOptions';
import { AlloyDrawStyleProcessor } from './AlloyDrawStyleProcessor';
import { AlloyDrawFeatureProperties } from '../../features/AlloyDrawFeatureProperties';
import { AlloyFeature } from '../../features/AlloyFeature';
// tslint:disable-next-line: max-line-length
import { AlloyGeometryFunctionUtils } from '../../styles/utils/geometry-functions/AlloyGeometryFunctionUtils';

/**
 * an alloy draw layer for rendering features that have been drawn on the map, use this to
 * add draw features onto the map and manage them from draw interaction
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
   * Processes an existing `AlloyFeature` into simple geometries and populates this
   * layer with `AlloyDrawFeature`s with these geometries
   * @param feature `AlloyFeature` to process
   * @param properties properties for created `AlloyDrawFeature`s
   */
  public addDrawFeature(feature: AlloyFeature, properties: AlloyDrawFeatureProperties) {
    const geometries = AlloyGeometryFunctionUtils.convertGeometryToSimpleGeometries(
      feature.olFeature.getGeometry(),
    );
    for (const geometry of geometries) {
      super.addFeature(new AlloyDrawFeature(uuid.v1(), new OLFeature(geometry), properties));
    }
  }

  /**
   * Removes a draw feature from the layer
   * @param feature `AlloyDrawFeature` that needs to be removed
   */
  public removeFeature(feature: AlloyDrawFeature): void {
    this.currentFeatures.delete(feature.id);
    this.olSource.removeFeature(feature.olFeature);
  }

  /**
   * Combine all features' geometries in this layer into a single geometry
   * @return single openlayers geometry of all features in the layer
   */
  public getAllFeaturesGeometry(): OLGeometry {
    const geometries: OLGeometry[] = this.olSource
      .getFeatures()
      .map((feature) => feature.getGeometry());
    if (geometries.length === 1) {
      return geometries[0];
    } else if (geometries.length > 1) {
      // check if all the same type and create a Multi-geoemtry
      if (geometries.every((geom) => geom.getType() === geometries[0].getType())) {
        switch (geometries[0].getType()) {
          case AlloyDrawGeometryType.Point:
            return new OLMultiPoint((geometries as OLPoint[]).map((geom) => geom.getCoordinates()));
          case AlloyDrawGeometryType.LineString:
            return new OLMultiLineString(
              (geometries as OLLineString[]).map((geom) => geom.getCoordinates()),
            );
          case AlloyDrawGeometryType.Polygon:
            return new OLMultiPolygon(
              (geometries as OLPolygon[]).map((geom) => geom.getCoordinates()),
            );
          default:
            throw new AlloyMapError(
              1556196597,
              `Unhandled geometry type ${geometries[0].getType()} in drawing layer`,
            );
        }
      }
      // otherwise wrap all in multi-collection
      return new OLGeometryCollection(geometries);
    }

    throw new AlloyMapError(1556196189, 'No geometries found in draw layer');
  }
}
