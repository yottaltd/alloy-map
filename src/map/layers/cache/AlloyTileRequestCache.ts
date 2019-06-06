import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyTileRequestCacheItem } from './AlloyTileRequestCacheItem';

/**
 * an in memory cache of tile requests that supports cancellation for offscreen tiles
 * @ignore
 * @internal
 */
export class AlloyTileRequestCache<T extends AlloyFeature> {
  /**
   * the requests that are currently active
   */
  private readonly requests = new Map<number, Map<string, AlloyTileRequestCacheItem<T>>>();

  /**
   * sets a request in the cache
   * @param request the request to add to the cache
   */
  public set(request: AlloyTileRequestCacheItem<T>): void {
    const zoom = request.tileCoordinate[0];
    let requestsAtZoom = this.requests.get(zoom);
    if (!requestsAtZoom) {
      requestsAtZoom = new Map<string, AlloyTileRequestCacheItem<T>>();
      this.requests.set(zoom, requestsAtZoom);
    }
    requestsAtZoom.set(this.getCacheItemKey(request.tileCoordinate), request);
  }

  /**
   * deletes and cancels a request in the cache, if no request exists in the cache it will be
   * ignored
   * @param request the request to cancel
   * @param cancel optionally decide to cancel a request
   */
  public delete(request: AlloyTileRequestCacheItem<T>, cancel: boolean = true): void {
    if (cancel) {
      request.cancel();
    }
    const requestsAtZoom = this.requests.get(request.tileCoordinate[0]);
    if (requestsAtZoom) {
      requestsAtZoom.delete(this.getCacheItemKey(request.tileCoordinate));
    }
  }

  /**
   * clears the entire cache and cancels all current requests
   */
  public clear(): void {
    this.requests.forEach((value) => value.forEach((request) => request.cancel()));
    this.requests.clear();
  }

  /**
   * clears an entire zoom level of cache and cancels all requests on that zoom level
   * @param zoom the zoom level to clear
   */
  public clearZoom(zoom: number): void {
    const requestsAtZoom = this.requests.get(zoom);
    if (requestsAtZoom) {
      [...requestsAtZoom.values()].forEach((request) => request.cancel());
      this.requests.delete(zoom);
    }
  }

  /**
   * clears all zoom levels outside of a given zoom and cancels all requests in those levels
   * @param zoom the zoom level to maintain the cache for
   */
  public clearOutsideZoom(zoom: number): void {
    [...this.requests.keys()].filter((key) => key !== zoom).forEach((key) => this.clearZoom(key));
  }

  /**
   * clears all tiles outside the zoom levels and tiles specified and cancels all requests on those
   * level
   * @param tiles the tiles to keep the requests active for (if any)
   */
  public clearOutsideTiles(tiles: Array<[number, number, number]>): void {
    // special case, wipe all if tiles are empty
    if (tiles.length === 0) {
      this.clear();
      return;
    }

    // get first zoom level
    const zoom = tiles[0][0];

    // clear everything outside these tile zoom levels
    this.clearOutsideZoom(zoom);

    // now get the zoom level of the tiles
    const requestsAtZoom = this.requests.get(zoom);
    if (requestsAtZoom) {
      // generate tile keys
      const tileKeysToKeep = new Set(tiles.map((tile) => this.getCacheItemKey(tile)));

      // cancel and remove any requests outside the tiles
      [...requestsAtZoom.values()]
        .filter((request) => !tileKeysToKeep.has(this.getCacheItemKey(request.tileCoordinate)))
        .forEach((request) => {
          request.cancel();
          requestsAtZoom.delete(this.getCacheItemKey(request.tileCoordinate));
        });
    }
  }

  /**
   * gets a cache key for a coordinate
   * @param coordinate the coordinate to generate a cache key for
   */
  private getCacheItemKey(coordinate: [number, number, number]): string {
    return Math.abs(coordinate[0]) + ':' + Math.abs(coordinate[1]) + ':' + Math.abs(coordinate[2]);
  }
}
