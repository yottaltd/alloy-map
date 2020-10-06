import { AlloyFeature } from '@/map/features/AlloyFeature';
import { AlloyTileRequestCacheItem } from '@/map/layers/cache/AlloyTileRequestCacheItem';
import { AlloyTileCoordinate } from '@/map/layers/loaders/AlloyTileCoordinate';

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
    let requestsAtZoom = this.requests.get(request.tileCoordinate.z);
    if (!requestsAtZoom) {
      requestsAtZoom = new Map<string, AlloyTileRequestCacheItem<T>>();
      this.requests.set(request.tileCoordinate.z, requestsAtZoom);
    }
    requestsAtZoom.set(request.tileCoordinate.requestKey, request);
  }

  /**
   * deletes and cancels a request in the cache, if no request exists in the cache it will be
   * ignored
   * @param request the request to cancel
   * @param cancel optionally decide to cancel a request
   */
  public delete(request: AlloyTileRequestCacheItem<T>, cancel = true): void {
    if (cancel) {
      request.cancel();
    }
    const requestsAtZoom = this.requests.get(request.tileCoordinate.z);
    if (requestsAtZoom) {
      requestsAtZoom.delete(request.tileCoordinate.requestKey);
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
      Array.from(requestsAtZoom.values()).forEach((request) => request.cancel());
      this.requests.delete(zoom);
    }
  }

  /**
   * clears all zoom levels outside of a given zoom and cancels all requests in those levels
   * @param zoom the zoom level to maintain the cache for
   */
  public clearOutsideZoom(zoom: number): void {
    Array.from(this.requests.keys())
      .filter((key) => key !== zoom)
      .forEach((key) => this.clearZoom(key));
  }

  /**
   * clears all tiles outside the zoom levels and tiles specified and cancels all requests on those
   * level
   * @param tiles the tiles to keep the requests active for (if any)
   */
  public clearOutsideTiles(tiles: AlloyTileCoordinate[]): void {
    // special case, wipe all if tiles are empty
    if (tiles.length === 0) {
      this.clear();
      return;
    }

    // get first zoom level
    const zoom = tiles[0].z;

    // clear everything outside these tile zoom levels
    this.clearOutsideZoom(zoom);

    // now get the zoom level of the tiles
    const requestsAtZoom = this.requests.get(zoom);
    if (requestsAtZoom) {
      // generate tile keys
      const tileKeysToKeep = new Set(tiles.map((tile) => tile.requestKey));

      // cancel and remove any requests outside the tiles
      Array.from(requestsAtZoom.values())
        .filter((request) => !tileKeysToKeep.has(request.tileCoordinate.requestKey))
        .forEach((request) => {
          request.cancel();
          requestsAtZoom.delete(request.tileCoordinate.requestKey);
        });
    }
  }
}
