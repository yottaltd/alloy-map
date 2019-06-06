import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyTileRequestCacheItem } from '../cache/AlloyTileRequestCacheItem';

/**
 * represents a tile feature request that can be cached and is cancellable if the tile leaves the
 * viewport before being loaded
 * @ignore
 * @internal
 */
export class AlloyTileFeatureRequest<T extends AlloyFeature>
  implements AlloyTileRequestCacheItem<T> {
  /**
   * @implements
   */
  public readonly tileCoordinate: [number, number, number];

  /**
   * @implements
   */
  public result: Promise<T[]> = Promise.resolve([]);

  /**
   * the abort controller used in fetch parameters
   */
  public readonly controller = new AbortController();

  /**
   * whether the request has been aborted
   */
  private aborted: boolean = false;

  /**
   * creates a new instance
   * @param tileCoordinate the tile coordinate to request
   */
  constructor(tileCoordinate: [number, number, number]) {
    this.tileCoordinate = tileCoordinate;
  }

  /**
   * @implements
   */
  public cancel(): void {
    if (!this.aborted) {
      this.controller.abort();
      this.aborted = true;
    }
  }
}
