import { Geometry } from 'geojson';
import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';
import { AlloyMapError } from '../error/AlloyMapError';
import { AlloyCoordinate } from '../map/core/AlloyCoordinate';
import { AlloyMap } from '../map/core/AlloyMap';
import { AlloyFeature } from '../map/features/AlloyFeature';
import { GeometryGuards } from '../map/guards/GeometryGuards';
import { AlloyLayerWithFeatures } from '../map/layers/AlloyLayerWithFeatures';
import { GeometryUtils } from './GeometryUtils';
import { ProjectionUtils } from './ProjectionUtils';
import { AlloyLayer } from '../map/layers/AlloyLayer';

/**
 * the property name of the feature id stored on an openlayers feature (so we can go from openlayers
 * feature back to an alloy feature in rare circumstances)
 * @ignore
 */
const OL_FEATURE_TO_FEATURE_ID = '__AlloyFeatureId__';

/**
 * utils for features
 * @ignore
 * @internal
 */
export abstract class FeatureUtils {
  /**
   * creates a feature id in a consistent format
   * @param layerCode the layer the feature originated from when loaded
   * @param olFeature the feature that was loaded (should have an id)
   */
  public static createFeatureId(layerCode: string, olFeature: OLFeature): string {
    return layerCode + ':' + olFeature.getId();
  }

  /**
   * finds features close to provided source
   * @param layers the alloy layers to search in
   * @param source `AlloyCoordinate` or `AlloyFeature` source to measure distance of features from
   * @param delta distance (in metres) from source for which to return features
   * @returns `Map<AlloyFeature, number>` where values are distances in metres to provided source
   */
  public static findFeaturesWithin(
    layers: AlloyLayer[],
    source: AlloyCoordinate | AlloyFeature | Geometry,
    delta: number,
  ): Map<AlloyFeature, number> {
    const features: Map<AlloyFeature, number> = new Map();

    // calculate the coordinate of source to use
    let sourceCoord: [number, number];
    let sourceBounds: [number, number, number, number];
    if (source instanceof AlloyCoordinate) {
      // if source is AlloyCoordinate then get map coordinate for it
      sourceCoord = source.toMapCoordinate();
    } else if (GeometryGuards.isGeometry(source)) {
      // if source is a Geometry then get centre map coordinate of it's bounds
      sourceCoord = GeometryUtils.getGeometryBounds(source)
        .getCentre()
        .toMapCoordinate();

      // inflate the source coordinate by the requested delta (metres) to make a first pass at
      // grabbing features within delta distance
      sourceBounds = [
        sourceCoord[0] - delta,
        sourceCoord[1] - delta,
        sourceCoord[0] + delta,
        sourceCoord[1] + delta,
      ];
    } else {
      // if source is an AlloyFeature then get centre map coordinate of it's bounds
      const featureBounds = GeometryUtils.getGeometryBounds(
        JSON.parse(ProjectionUtils.GEOJSON.writeGeometry(source.olFeature.getGeometry())),
      );
      sourceCoord = featureBounds.getCentre().toMapCoordinate();

      // get the bounds of the feature and add the delta as padding
      sourceBounds = featureBounds.toMapExtent();
      sourceBounds[0] -= delta;
      sourceBounds[1] -= delta;
      sourceBounds[2] += delta;
      sourceBounds[3] += delta;
    }

    layers.forEach((layer) => {
      // iterating over all map layers with features
      if (layer instanceof AlloyLayerWithFeatures) {
        // getting all features in current map extent
        layer.olSource.getFeaturesInExtent(sourceBounds).forEach((olFeature) => {
          // get closest point to source coordinate
          const closest = olFeature.getGeometry().getClosestPoint(sourceCoord);

          // set coordinate to use for length measurement from source
          let coord: [number, number];
          if (source instanceof AlloyCoordinate) {
            // if source is a coordinate then re-use source coordinate
            coord = sourceCoord;
          } else if (GeometryGuards.isGeometry(source)) {
            // if source is a geometry the read it and get closest point to feature we are checking
            coord = ProjectionUtils.GEOJSON.readGeometry(source).getClosestPoint(closest);
          } else {
            // if source is a feature then get closest point to feature we are checking
            coord = source.olFeature.getGeometry().getClosestPoint(closest);
          }

          // create line from coordinate and calculate length
          const line = new OLLineString([coord, closest]);
          const length = line.getLength();

          // add alloy feature to map if length is equals to or smaller than delta
          if (length <= delta) {
            const feature = layer.getFeatureById(FeatureUtils.getFeatureIdFromOlFeature(olFeature));
            if (!feature) {
              throw new AlloyMapError(1565622486, 'Could not get alloy feature for map feature');
            }
            features.set(feature, line.getLength());
          }
        });
      }
    });

    return features;
  }

  /**
   * gets the consistent feature id given an openlayers feature
   * @param olFeature the openlayers feature to get the id from
   */
  public static getFeatureIdFromOlFeature(olFeature: OLFeature): string {
    const id: any = olFeature.getProperties()[OL_FEATURE_TO_FEATURE_ID];
    if (typeof id !== 'string') {
      throw new AlloyMapError(1554055460, 'failed to get feature id from ol feature', {
        data: {
          olFeature,
        },
      });
    }
    return id;
  }

  /**
   * sets a feature id on an openlayer feature
   * @param olFeature the openlayers feature to set the id on
   * @param id the id to set
   */
  public static setFeatureIdForOlFeature(olFeature: OLFeature, id: string): void {
    olFeature.setProperties({
      [OL_FEATURE_TO_FEATURE_ID]: id,
    });
  }
}
