import { Debugger } from 'debug';
import OLProjection from 'ol/proj/Projection';
import OLTileGrid from 'ol/tilegrid/TileGrid';
import { PolyfillExtent } from '../../../polyfills/PolyfillExtent';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyTileCache } from '../cache/AlloyTileCache';
import { AlloyTileRequestCache } from '../cache/AlloyTileRequestCache';
import { AlloyFeatureLoader } from './AlloyFeatureLoader';
import { AlloyTileFeatureRequest } from './AlloyTileFeatureRequest';
import { AlloyTileCoordinate } from './AlloyTileCoordinate';

/**
 * the number of tile requests to cache in memory
 * @ignore
 */
const TILE_CACHE_SIZE = 256;

/**
 * the number of minutes to cache a tile for, it isn't guaranteed to be cached this long due to
 * either cache pressure or being added towards the end of the cache window
 * @ignore
 */
const TILE_CACHE_MINUTES = 1;

/**
 * base implementation which loads features from a source by tile coordinates, it supports
 * cancellation of ongoing requests if they move outside the viewport or zoom levels change for
 * efficiency
 * @template T the feature types the loader is expected to load
 * @ignore
 * @internal
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
  private readonly tileCache = new AlloyTileCache<AlloyTileFeatureRequest<T>>(TILE_CACHE_SIZE);

  /**
   * a cache of ongoing requests only
   */
  private readonly requestCache = new AlloyTileRequestCache<T>();

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

  /**
   * @implements
   */
  public async loadFeatures(
    extent: [number, number, number, number],
    resolution: number,
    projection: OLProjection,
  ): Promise<void> {
    this.debugger('load features requested, resolution: %d, extent: %o', resolution, extent);

    // short circuit if the view is out of bounds
    if (!PolyfillExtent.intersects(this.olLayerExtent, extent)) {
      this.requestCache.clear(); // clear all requests if we're outside the bounds
      this.debugger('view is out of bounds');
      return;
    }

    // array of requests for tiles, each result is the loaded features for a given tile
    const requests: Array<Promise<T[]>> = [];

    // calculate the zoom level for the current resolution
    const zoom = this.olTileGrid.getZForResolution(resolution);

    // get all the tile coordinates that we are going to request
    const tileCoordinates: AlloyTileCoordinate[] = [];
    this.olTileGrid.forEachTileCoord(extent, zoom, (coordinate: [number, number, number]) =>
      tileCoordinates.push(new AlloyTileCoordinate(coordinate)),
    );

    // cancel any ongoing calls outside zoom and tiles that are going to be requested
    this.requestCache.clearOutsideTiles(tileCoordinates);

    // iterate through tile coords for the current extent and zoom
    tileCoordinates.forEach((coordinate) => {
      this.debugger('features requested for tile, %o', coordinate.olTileCoordinate);

      // check the tile cache first, if we have results then use them
      const tileCacheKey = AlloyTileCache.createTimeBasedKey(coordinate, TILE_CACHE_MINUTES);
      const tileCacheItem = this.tileCache.get(tileCacheKey);
      if (tileCacheItem) {
        this.debugger('request cached, reusing tile, %o', coordinate.olTileCoordinate);
        requests.push(tileCacheItem.result);
        return;
      }

      // short circuit if the tile is out of bounds
      const olTileCoordExtent = this.olTileGrid.getTileCoordExtent(coordinate.olTileCoordinate);
      if (!PolyfillExtent.intersects(this.olLayerExtent, olTileCoordExtent)) {
        this.debugger('tile is out of bounds');
        return;
      }

      // load the tile
      requests.push(this.loadTile(coordinate, tileCacheKey));
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
   * @param coordinate the tile coordinate to request
   */
  protected abstract requestTile(coordinate: AlloyTileCoordinate): AlloyTileFeatureRequest<T>;

  /**
   * requests a single tile of features from the api
   * @param coordinate the tile coordinate to load
   * @param tileCacheKey the cache key for the tile
   */
  private async loadTile(coordinate: AlloyTileCoordinate, tileCacheKey: string): Promise<T[]> {
    // make the request for data
    this.debugger(
      'requesting tile data for x: %d, y: %d, z: %d',
      coordinate.x,
      coordinate.y,
      coordinate.z,
    );
    const request: AlloyTileFeatureRequest<T> = this.requestTile(coordinate);

    // add the request to the tile cache early
    this.tileCache.set(tileCacheKey, request);

    // add the request to ongoing requests
    this.requestCache.set(request);

    // now wait for the features to arrive
    let features: T[];
    try {
      features = await request.result;
    } catch (e) {
      this.debugger(
        'failed to get tile data for x: %d, y: %d, z: %d, error: %o',
        coordinate.x,
        coordinate.y,
        coordinate.z,
        e,
      );
      return []; // we specifically are not caching failed api calls
    } finally {
      // always remove the request when it completes or fails
      this.requestCache.delete(request, false);
    }

    // debug message is behind guard because we evaluate length of variable
    if (this.debugger.enabled) {
      this.debugger(
        '%d results added to cache for tile x: %d, y: %d, z: %d',
        features.length,
        coordinate.x,
        coordinate.y,
        coordinate.z,
      );
    }

    return features;
  }
}
