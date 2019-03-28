/**
 * a cacheable tile item
 */
export interface AlloyTileCacheItem<T> {
  /**
   * the key of the item in the cache
   */
  readonly key: string;

  /**
   * the previous item in the cache
   */
  previous: AlloyTileCacheItem<T> | null;

  /**
   * the next item in the cache
   */
  next: AlloyTileCacheItem<T> | null;

  /**
   * the data being cached
   */
  readonly payload: T;
}
