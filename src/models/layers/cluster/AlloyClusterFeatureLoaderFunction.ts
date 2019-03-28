import { Debugger } from 'debug';
import OLProjection from 'ol/proj/Projection';
import { PolyfillExtent } from '../../../polyfills/PolyfillExtent';
import { ProjectionUtils } from '../../../utils/ProjectionUtils';
import { AlloyMapError } from '../../core/AlloyMapError';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyFeatureType } from '../../features/AlloyFeatureType';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyFeatureLoader } from '../AlloyFeatureLoader';
import { AlloyTileCache } from '../cache/AlloyTileCache';
import { AlloyClusterLayer } from './AlloyClusterLayer';

/**
 * the number of tile requests to cache in memory
 * @ignore
 */
const TILE_CACHE_SIZE = 256;

/**
 * loads cluster layer features from the alloy api
 * @ignore
 */
export class AlloyClusterFeatureLoaderFunction implements AlloyFeatureLoader {
  /**
   * debugger instance
   * @ignore
   */
  private readonly debugger: Debugger;

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
   * a cache of tiles requested by this loader
   */
  private readonly tileCache = new AlloyTileCache<Array<AlloyItemFeature | AlloyClusterFeature>>(
    TILE_CACHE_SIZE,
  );

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

    // setup the debugger
    this.debugger = layer.debugger.extend(AlloyClusterFeatureLoaderFunction.name);
  }

  public async loadFeatures(
    extent: [number, number, number, number],
    resolution: number,
    projection: OLProjection,
  ): Promise<void> {
    this.debugger('load features requested, resolution: %d, extent: %o', resolution, extent);

    // short circuit if the view is out of bounds
    if (!PolyfillExtent.intersects(this.olLayerExtent, extent)) {
      this.debugger('view is out of bounds');
      return;
    }

    // calculate the zoom level for the current resolution
    const zoom = this.layer.olTileGrid.getZForResolution(resolution);

    const requests: Array<Promise<Array<AlloyItemFeature | AlloyClusterFeature>>> = [];

    // iterate through tile coords for the current extent and zoom
    this.layer.olTileGrid.forEachTileCoord(extent, zoom, (coordinate: [number, number, number]) => {
      this.debugger('features requested for tile, %o', coordinate);

      // check the tile cache first, if we have results then use them
      const tileCacheItem = this.tileCache.get(AlloyTileCache.createKey(coordinate, this.styleIds));
      if (tileCacheItem) {
        this.debugger('data cached, reusing tile, %o');
        return tileCacheItem;
      }

      // short circuit if the tile is out of bounds
      const tileCoordExtent = this.layer.olTileGrid.getTileCoordExtent(coordinate);
      if (!PolyfillExtent.intersects(this.olLayerExtent, tileCoordExtent)) {
        this.debugger('tile is out of bounds');
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
    const x: number = coordinate[1];
    const y: number = Math.abs(coordinate[2] + 1);
    const z: number = coordinate[0];
    this.debugger('requesting tile data for x: %d, y: %d, z: %d', x, y, z);
    const response = await this.layer.map.api.layer.layerGetClusterLayerTile(
      this.layer.layerCode,
      x,
      y,
      z,
      this.styleIds,
    );

    // return early if no results
    if (response.results.length === 0) {
      this.debugger('no results for tile x: %d, y: %d, z: %d', x, y, z);
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
    const features = response.results.map((r: any /* we don't have typings */, i: number) => {
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

    // add the results to the tile cache
    this.tileCache.set(AlloyTileCache.createKey(coordinate, this.styleIds), features);
    if (this.debugger.enabled) {
      this.debugger(
        '%d results added to cache for tile x: %d, y: %d, z: %d',
        features.length,
        x,
        y,
        z,
      );
    }

    return features;
  }
}
