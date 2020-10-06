/* eslint-disable max-len */

import { AlloyMapError } from '@/error/AlloyMapError';
import { AlloyBounds } from '@/map/core/AlloyBounds';
import { AlloyCoordinate } from '@/map/core/AlloyCoordinate';
import { AlloyFeature } from '@/map/features/AlloyFeature';
import { GeometryGuards } from '@/map/guards/GeometryGuards';
import { AlloyLayer } from '@/map/layers/AlloyLayer';
import { AlloyLayerWithFeatures } from '@/map/layers/AlloyLayerWithFeatures';
import { AlloyGeometryFunctionUtils } from '@/map/styles/utils/geometry-functions/AlloyGeometryFunctionUtils';
import { PolyfillExtent } from '@/polyfills/PolyfillExtent';
import { GeometryUtils } from '@/utils/GeometryUtils';
import { FindFeaturesWithinResult } from '@/utils/models/FindFeaturesWithinResult';
import { ProjectionUtils } from '@/utils/ProjectionUtils';
import { Geometry } from 'geojson';
import * as _ from 'lodash';
import { Coordinate as OLCoordinate } from 'ol/coordinate';
import { Extent as OLExtent } from 'ol/extent';
import OLFeature from 'ol/Feature';
import OLLineString from 'ol/geom/LineString';

/* eslint-enable max-len */

/**
 * the property name of the feature id stored on an openlayers feature (so we can go from openlayers
 * feature back to an alloy feature in rare circumstances)
 * @ignore
 * @internal
 */
export const OL_FEATURE_TO_FEATURE_ID = '__AlloyFeatureId__';

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
   * @param source `AlloyCoordinate`, `AlloyFeature` or `Geometry` source to measure distance of
   * features from
   * @param delta distance (in metres) from source for which to return features
   * @returns an array of results ordered by closest first
   */
  public static findFeaturesWithin(
    layers: AlloyLayer[],
    source: AlloyCoordinate | AlloyFeature | Geometry,
    delta: number,
  ): FindFeaturesWithinResult[] {
    const features: FindFeaturesWithinResult[] = [];

    // calculate the coordinate and bounds of source to use
    let sourceCoord: OLCoordinate;
    let sourceBounds: OLExtent;

    if (source instanceof AlloyCoordinate) {
      // if source is AlloyCoordinate then get map coordinate for it
      sourceCoord = source.toMapCoordinate();

      // inflate the source coordinate by the requested delta (metres) to make a first pass at
      // grabbing features within delta distance
      sourceBounds = [
        sourceCoord[0] - delta,
        sourceCoord[1] - delta,
        sourceCoord[0] + delta,
        sourceCoord[1] + delta,
      ];
    } else {
      // get the bounds of the geometry or feature
      let bounds: AlloyBounds;
      if (GeometryGuards.isGeometry(source)) {
        bounds = GeometryUtils.getGeometryBounds(source);
      } else {
        bounds = GeometryUtils.getGeometryBounds(
          JSON.parse(ProjectionUtils.GEOJSON.writeGeometry(source.olFeature.getGeometry())),
        );
      }

      // get centre for source
      sourceCoord = bounds.getCentre().toMapCoordinate();

      // get the bounds of the feature/geom and add the delta as padding
      sourceBounds = bounds.toMapExtent();
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
          let coord: OLCoordinate;
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
            features.push({
              feature,
              distance: line.getLength(),
            });
          }
        });
      }
    });

    // sort by distance
    features.sort((a, b) => a.distance - b.distance);

    return features;
  }

  /**
   * Calculates `AlloyBounds` that wraps all provided features
   * @param features `AlloyFeature` array to calculate bounds for
   * @param bufferPercent whether to add a buffer around wrapped features
   * @returns `AlloyBounds` that wraps all provided features
   */
  public static calculateFeaturesBounds(
    features: AlloyFeature[],
    bufferPercent?: number,
  ): AlloyBounds {
    // flatten coordinates of features
    const coordinates: OLCoordinate[] = _.flatten(
      features.map((feature) =>
        AlloyGeometryFunctionUtils.convertGeometryToMultiPoint(
          feature.olFeature.getGeometry(),
        ).getCoordinates(),
      ),
    );

    // calculate bounding extent for coordinates
    let extent = PolyfillExtent.boundingExtent(coordinates);

    if (bufferPercent) {
      const bufferValue =
        (Math.min(extent[2] - extent[0], extent[3] - extent[1]) * bufferPercent) / 100.0;
      extent = PolyfillExtent.buffer(extent, bufferValue);
    }

    // convert extent to alloy bounds
    return new AlloyBounds(
      AlloyCoordinate.fromMapCoordinate([extent[0], extent[1]]),
      AlloyCoordinate.fromMapCoordinate([extent[2], extent[3]]),
    );
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
