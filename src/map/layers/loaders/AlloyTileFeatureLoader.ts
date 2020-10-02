import { Extent as OLExtent } from 'ol/extent';
import OLProjection from 'ol/proj/Projection';
import OLTileGrid from 'ol/tilegrid/TileGrid';
import { PolyfillExtent } from '../../../polyfills/PolyfillExtent';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyTileCache } from '../cache/AlloyTileCache';
import { AlloyTileRequestCache } from '../cache/AlloyTileRequestCache';
import { AlloyFeatureLoader } from './AlloyFeatureLoader';
import { AlloyTileCoordinate } from './AlloyTileCoordinate';
import { AlloyTileFeatureRequest } from './AlloyTileFeatureRequest';

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
   * the extent to load features within
   */
  private readonly olLayerExtent: OLExtent;

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
   * @param olLayerExtent the openlayers extent of the layer
   */
  constructor(olTileGrid: OLTileGrid, olLayerExtent: OLExtent) {
    this.olTileGrid = olTileGrid;
    this.olLayerExtent = olLayerExtent;
  }

  /**
   * @implements
   */
  public async loadFeatures(
    extent: OLExtent,
    resolution: number,
    projection: OLProjection,
  ): Promise<void> {
    // short circuit if the view is out of bounds
    if (!PolyfillExtent.intersects(this.olLayerExtent, extent)) {
      this.requestCache.clear(); // clear all requests if we're outside the bounds
      return;
    }

    // array of requests for tiles, each result is the loaded features for a given tile
    const requests: Array<Promise<T[]>> = [];

    // calculate the zoom level for the current resolution, direction = 1 floors zoom when rounding
    const zoom = this.olTileGrid.getZForResolution(resolution, 1);

    // get all the tile coordinates that we are going to request
    const tileCoordinates: AlloyTileCoordinate[] = [];
    this.olTileGrid.forEachTileCoord(extent, zoom, (coordinate: number[]) =>
      tileCoordinates.push(new AlloyTileCoordinate(coordinate)),
    );

    // cancel any ongoing calls outside zoom and tiles that are going to be requested
    this.requestCache.clearOutsideTiles(tileCoordinates);

    // iterate through tile coords for the current extent and zoom
    tileCoordinates.forEach((coordinate) => {
      // check the tile cache first, if we have results then use them
      const tileCacheKey = AlloyTileCache.createTimeBasedKey(coordinate, TILE_CACHE_MINUTES);
      const tileCacheItem = this.tileCache.get(tileCacheKey);
      if (tileCacheItem) {
        requests.push(tileCacheItem.result);
        return;
      }

      // short circuit if the tile is out of bounds
      const olTileCoordExtent = this.olTileGrid.getTileCoordExtent(coordinate.olTileCoordinate);
      if (!PolyfillExtent.intersects(this.olLayerExtent, olTileCoordExtent)) {
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
      return []; // we specifically are not caching failed api calls
    } finally {
      // always remove the request when it completes or fails
      this.requestCache.delete(request, false);
    }

    return features;
  }
}
