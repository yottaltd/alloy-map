import { Debugger } from 'debug';
import OLProjection from 'ol/proj/Projection';
import OLTileGrid from 'ol/tilegrid/TileGrid';
import { PolyfillExtent } from '../../../polyfills/PolyfillExtent';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyTileCache } from '../cache/AlloyTileCache';
import { AlloyFeatureLoader } from './AlloyFeatureLoader';

/**
 * the number of tile requests to cache in memory
 * @ignore
 */
const TILE_CACHE_SIZE = 256;

/**
 * base implementation which loads features from a source by tile coordinates
 * @template T the feature types the loader is expected to load
 * @ignore
 */
export abstract class AlloyTileFeatureLoader<T extends AlloyFeature> implements AlloyFeatureLoader {
  /**
   * debugger instance
   */
  protected readonly debugger: Debugger;

  /**
   * the extent to load features within
   */
  private readonly olLayerExtent: [number, number, number, number];

  /**
   * the tilegrid to use when computing tile coordinates
   */
  private readonly olTileGrid: OLTileGrid;

  /**
   * a cache of tiles requested by this loader
   */
  private readonly tileCache = new AlloyTileCache<T[]>(TILE_CACHE_SIZE);

  /**
   * creates a new instance
   * @param olTileGrid the openlayers tilegrid to use for calculating tile coordinates
   * @param parentDebugger the parent debugger to extend
   */
  constructor(
    olTileGrid: OLTileGrid,
    olLayerExtent: [number, number, number, number],
    parentDebugger: Debugger,
  ) {
    this.olTileGrid = olTileGrid;
    this.olLayerExtent = olLayerExtent;

    // setup the debugger
    this.debugger = parentDebugger.extend(AlloyTileFeatureLoader.name);
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
    const zoom = this.olTileGrid.getZForResolution(resolution);

    const requests: Array<Promise<T[]>> = [];

    // iterate through tile coords for the current extent and zoom
    this.olTileGrid.forEachTileCoord(extent, zoom, (coordinate: [number, number, number]) => {
      this.debugger('features requested for tile, %o', coordinate);

      // check the tile cache first, if we have results then use them
      const tileCacheItem = this.tileCache.get(AlloyTileCache.createKey(coordinate));
      if (tileCacheItem) {
        this.debugger('data cached, reusing tile, %o', coordinate);
        requests.push(Promise.resolve(tileCacheItem));
        return;
      }

      // short circuit if the tile is out of bounds
      const tileCoordExtent = this.olTileGrid.getTileCoordExtent(coordinate);
      if (!PolyfillExtent.intersects(this.olLayerExtent, tileCoordExtent)) {
        this.debugger('tile is out of bounds');
        return;
      }

      // load the tile
      requests.push(this.loadTile(coordinate));
    });

    if (requests.length > 0) {
      // wait for all the results to finish loading
      const results = await Promise.all(requests);

      // check if we are still at the same resolution as when the original request was made
      if (this.getResolution() === resolution) {
        // flatten the results and add to the layer in one operation for performance because
        // individual calls would potentially trigger a repaint
        const features = results.reduce((acc, val) => acc.concat(val), []);
        if (features.length > 0) {
          this.featuresLoaded(features);
        }
      }
    }
  }

  /**
   * get the current resolution
   */
  protected abstract getResolution(): number;

  /**
   * should add the loaded features to the layer or other managed source, they may have come from a
   * service request or the cache
   * @param features the features that have finished loading
   */
  protected abstract featuresLoaded(features: T[]): void;

  /**
   * should make a request for a tile to obtain its features
   * @param x the world tile x coordinate
   * @param y the world tile y coordinate
   * @param z the zoom level
   */
  protected abstract async requestTile(x: number, y: number, z: number): Promise<T[]>;

  /**
   * requests a single tile of features from the api
   * @param coordinate the tile coordinate in z, x, y
   */
  private async loadTile(coordinate: [number, number, number]): Promise<T[]> {
    // calculate x, y and z
    const x: number = coordinate[1];
    const y: number = Math.abs(coordinate[2] + 1);
    const z: number = coordinate[0];

    // make the request for data
    this.debugger('requesting tile data for x: %d, y: %d, z: %d', x, y, z);
    const features = await this.requestTile(x, y, z);

    // add the results to the tile cache
    this.tileCache.set(AlloyTileCache.createKey(coordinate), features);
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
