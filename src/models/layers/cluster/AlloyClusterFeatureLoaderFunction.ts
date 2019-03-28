import OLProjection from 'ol/proj/Projection';
import { PolyfillExtent } from '../../../polyfills/PolyfillExtent';
import { AlloyMapError } from '../../core/AlloyMapError';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyFeatureType } from '../../features/AlloyFeatureType';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyFeatureLoader } from '../AlloyFeatureLoader';
import { AlloyClusterLayer } from './AlloyClusterLayer';
import { ProjectionUtils } from '../../../utils/ProjectionUtils';

/**
 * loads cluster layer features from the alloy api
 * @ignore
 */
export class AlloyClusterFeatureLoaderFunction implements AlloyFeatureLoader {
  /**
   * the layer we are loading features for
   */
  private readonly layer: AlloyClusterLayer;

  /**
   * the computed openlayers extent for the current layer, cached once during creation so we don't
   * have to recompute the projected coordinates each time
   */
  private readonly olLayerExtent: [number, number, number, number];

  /**
   * the computed style ids for the current layer to loader
   */
  private readonly styleIds: string[];

  /**
   * creates a new instance
   * @param layer the layer to load features for
   */
  constructor(layer: AlloyClusterLayer) {
    this.layer = layer;
    // calculate the extent once and cache
    this.olLayerExtent = layer.extent.toMapExtent();
    // calculate the style ids and cache
    this.styleIds = layer.styles.map((s) => s.styleId);
  }

  public async loadFeatures(
    extent: [number, number, number, number],
    resolution: number,
    projection: OLProjection,
  ): Promise<void> {
    // short circuit if the view is out of bounds
    if (!PolyfillExtent.intersects(this.olLayerExtent, extent)) {
      return;
    }

    // calculate the zoom level for the current resolution
    const zoom = this.layer.olTileGrid.getZForResolution(resolution);

    const requests: Array<Promise<Array<AlloyItemFeature | AlloyClusterFeature>>> = [];

    // iterate through tile coords for the current extent and zoom
    this.layer.olTileGrid.forEachTileCoord(extent, zoom, (coordinate: [number, number, number]) => {
      // short circuit if the tile is out of bounds
      const tileCoordExtent = this.layer.olTileGrid.getTileCoordExtent(coordinate);
      if (!PolyfillExtent.intersects(this.olLayerExtent, tileCoordExtent)) {
        return;
      }

      // make an outgoing request for the tile we want
      requests.push(this.requestTile(coordinate));
    });

    if (requests.length > 0) {
      const results = await Promise.all(requests);
      // flatten the results and add to the layer in one operation for performance because
      // individual calls would potentially trigger a repaint
      const features = results.reduce((acc, val) => acc.concat(val), []);
      if (features.length > 0) {
        this.layer.addFeatures(features);
      }
    }
  }

  /**
   * requests a single tile of features from the api
   * @param coordinate the tile coordinate in z, x, y
   */
  private async requestTile(
    coordinate: [number, number, number],
  ): Promise<Array<AlloyItemFeature | AlloyClusterFeature>> {
    const response = await this.layer.map.api.layer.layerGetClusterLayerTile(
      this.layer.layerCode,
      coordinate[1], // x
      Math.abs(coordinate[2] + 1), // y
      coordinate[0], // z
      this.styleIds,
    );

    // return early if no results
    if (response.results.length === 0) {
      return [];
    }

    // first convert the results into openlayers features, use the bulk method as its optimised
    const olFeatures = this.layer.olFormat.readFeatures(
      {
        type: 'FeatureCollection',
        features: response.results,
      },
      {
        // the projection to convert the data into (should match the layer)
        featureProjection: ProjectionUtils.MAP_PROJECTION,
        // the projection the data is expected to be in
        dataProjection: ProjectionUtils.API_PROJECTION,
      },
    );

    // there be demons ahead! be warned we are working with a plain'ol JavaScript object for each
    // result in the following process, be careful when modifying these and make sure they match
    // what the service is giving us. Think about performance because there could be MANY results
    // and this is called potentially 30-40 times in a second when panning
    return response.results.map((r: any /* we don't have typings */, i: number) => {
      // we switch on "type" we know this exists because of the spec for the cluster endpoint
      switch (r.properties.type) {
        case AlloyFeatureType.Cluster:
          return new AlloyClusterFeature(olFeatures[i], r.properties);
        case AlloyFeatureType.Item:
          return new AlloyItemFeature(olFeatures[i], r.properties);
        default:
          throw new AlloyMapError(
            1553737510,
            `unhandled alloy feature type ${r.properties.type}, expected Cluster or Item`,
          );
      }
    });
  }
}
