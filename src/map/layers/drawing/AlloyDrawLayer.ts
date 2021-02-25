/* eslint-disable max-len */

import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyLayerZIndex } from '@/map/core/AlloyLayerZIndex';
import { AlloyMap } from '@/map/core/AlloyMap';
import { AlloyDrawFeature } from '@/map/features/AlloyDrawFeature';
import { AlloyLayerWithFeatures } from '@/map/layers/AlloyLayerWithFeatures';
import { AlloyDrawLayerOptions } from '@/map/layers/drawing/AlloyDrawLayerOptions';
import { AlloyDrawStyleProcessor } from '@/map/layers/drawing/AlloyDrawStyleProcessor';
import { GeometryUtils } from '@/utils/GeometryUtils';
import { ProjectionUtils } from '@/utils/ProjectionUtils';
import { Geometry } from 'geojson';
import OLGeometry from 'ol/geom/Geometry';
import OLGeometryCollection from 'ol/geom/GeometryCollection';
import OLGeometryType from 'ol/geom/GeometryType';
import OLLineString from 'ol/geom/LineString';
import OLMultiLineString from 'ol/geom/MultiLineString';
import OLMultiPoint from 'ol/geom/MultiPoint';
import OLMultiPolygon from 'ol/geom/MultiPolygon';
import OLPoint from 'ol/geom/Point';
import OLPolygon from 'ol/geom/Polygon';
import { v1 as uuidv1 } from 'uuid';

/* eslint-enable max-len */

/**
 * an alloy draw layer for rendering features that have been drawn on the map, use this to
 * add draw features onto the map and manage them from draw interaction
 * @ignore
 * @internal
 */
export class AlloyDrawLayer extends AlloyLayerWithFeatures<AlloyDrawFeature> {
  /**
   * Initialisation options for this layer.
   */
  private readonly options: AlloyDrawLayerOptions;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyDrawLayerOptions) {
    super(AlloyDrawLayer.name + ':' + uuidv1(), options.map, AlloyLayerZIndex.Drawing);
    this.options = options;

    // initialised here because style processor need some of the above internal properties
    this.setStyleProcessor(new AlloyDrawStyleProcessor(this));
  }

  /**
   * @override
   */
  public addFeature(feature: AlloyDrawFeature, addToSource = true): boolean {
    // overrides implementation of super.addFeature to support adding features but not to source as
    // this is handled by the openlayers draw interaction and causes exceptions if we add it
    // manually
    if (addToSource) {
      return super.addFeature(feature);
    } else {
      // this is the copy of the super.addFeature
      if (this.currentFeatures.has(feature.id)) {
        this.debugger('feature: %s already exists in layer', feature.id);
        return false;
      }

      this.debugger('adding feature: %s', feature.id);
      this.currentFeatures.set(feature.id, feature);
      return true;
    }
  }

  /**
   * Combine all features' geometries in this layer into a single geometry
   * @return single GeoJSON geometry of all features in the layer
   */
  public getAllFeaturesGeometry(): Geometry {
    const geometries: OLGeometry[] = Array.from(this.currentFeatures.values()).map((feature) =>
      feature.olFeature.getGeometry(),
    );

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
          case OLGeometryType.POINT:
            geom = new OLMultiPoint((geometries as OLPoint[]).map((g) => g.getCoordinates()));
            break;
          case OLGeometryType.LINE_STRING:
            geom = new OLMultiLineString(
              (geometries as OLLineString[]).map((g) => g.getCoordinates()),
            );
            break;
          case OLGeometryType.POLYGON:
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
        const collection: OLGeometry[] = [];

        // Add Point if only 1 present, otherwise wrap all in MultiPoint
        const points: OLPoint[] = geometries.filter(
          (g): g is OLPoint => g.getType() === OLGeometryType.POINT,
        );
        if (points.length > 1) {
          collection.push(new OLMultiPoint(points.map((point) => point.getCoordinates())));
        } else if (points.length === 1) {
          collection.push(points[0]);
        }

        // Add LineString if only 1 present, otherwise wrap all in MultiLineStrings
        const lineStrings: OLLineString[] = geometries.filter(
          (g): g is OLLineString => g.getType() === OLGeometryType.LINE_STRING,
        );
        if (lineStrings.length > 1) {
          collection.push(
            new OLMultiLineString(lineStrings.map((lineString) => lineString.getCoordinates())),
          );
        } else if (lineStrings.length === 1) {
          collection.push(lineStrings[0]);
        }

        // Add Polygon if only 1 present, otherwise wrap all in MultiPolygon
        const polygons: OLPolygon[] = geometries.filter(
          (g): g is OLPolygon => g.getType() === OLGeometryType.POLYGON,
        );
        if (polygons.length > 1) {
          collection.push(new OLMultiPolygon(polygons.map((polygon) => polygon.getCoordinates())));
        } else if (polygons.length === 1) {
          collection.push(polygons[0]);
        }

        // Wrap all geometries in GeometryCollection
        geom = new OLGeometryCollection(collection);
      }
    }

    const geometry: Geometry = ProjectionUtils.GEOJSON.writeGeometryObject(geom);
    GeometryUtils.roundCoordinates(geometry);
    return geometry;
  }

  /**
   * updates styles of drawn features
   * @param feature specify the feature to update styles for or null for all features in the layer
   * @ignore
   * @internal
   */
  public updateStyles(feature: AlloyDrawFeature | null): void {
    // determine the features to update
    const features: AlloyDrawFeature[] = feature
      ? [feature]
      : Array.from(this.currentFeatures.values());

    features.forEach((clearFeature) => this.resetStyle(clearFeature.olFeature));
  }

  /**
   * @implements
   */
  public dispose(): void {
    // nothing
  }

  /**
   * @implements
   */
  public clone(map: AlloyMap): AlloyDrawLayer {
    const newOptions = Object.assign({}, this.options, { map });
    return new AlloyDrawLayer(newOptions);
  }
}
