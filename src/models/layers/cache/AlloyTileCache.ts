import { AlloyTileCacheItem } from './AlloyTileCacheItem';

/**
 * represents a FIFO style cache for tiles
 * @ignore
 */
export class AlloyTileCache<T> {
  /**
   * generates a consistent tile cache key
   * @param coordinate the coordinate to generate a key for
   */
  public static createKey(coordinate: [number, number, number]): string {
    return coordinate.join(':');
  }

  /**
   * the internal cache of items against the tile key
   */
  private readonly cache = new Map<string, AlloyTileCacheItem<T>>();

  /**
   * the max size of the cache
   */
  private readonly limit: number;

  /**
   * the current length or size of the cache
   */
  private length: number = 0;

  /**
   * the head item
   */
  private head: AlloyTileCacheItem<T> | null = null;

  /**
   * the tail item
   */
  private tail: AlloyTileCacheItem<T> | null = null;

  /**
   * creates a new instance
   * @param limit the size limit of the cache
   */
  constructor(limit: number) {
    this.limit = limit;
  }

  /**
   * clears the cache
   */
  public clear() {
    this.cache.clear();
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * gets a cache item by its key
   * @param key the key to fetch
   */
  public get(key: string): T | null {
    const item = this.cache.get(key);
    return item ? item.payload : null;
  }

  /**
   * sets a cache item by its key
   * @param key the key to set
   * @param item the item to cache against the key
   */
  public set(key: string, item: T) {
    // remove any current item matching the key
    const currentItem = this.cache.get(key) || null;
    if (currentItem !== null) {
      this.removeItem(currentItem);
    }

    // constrain the cache to its max size
    if (this.length === this.limit && this.tail !== null) {
      this.removeItem(this.tail);
    }

    // create a new cache item
    const cacheItem: AlloyTileCacheItem<T> = {
      key,
      next: this.head,
      previous: null,
      payload: item,
    };

    // if we have a head item then make it point to our "new head"
    if (this.head !== null) {
      this.head.previous = cacheItem;
    }

    // make our new item the "new head"
    this.head = cacheItem;

    // if the tail is not assigned then set item to tail
    if (this.tail === null) {
      this.tail = cacheItem;
    }

    // finally add the item to the map and bump length
    this.cache.set(key, cacheItem);
    this.length += 1;
  }

  /**
   * removes an item from the cache and updates any internals
   * @param item the item to remove
   */
  private removeItem(item: AlloyTileCacheItem<T>) {
    if (this.head === item) {
      this.head = item.next;
    }
    if (this.tail === item) {
      this.tail = item.previous;
    }
    if (item.next !== null) {
      item.next.previous = item.previous;
    }
    this.cache.delete(item.key);
    this.length -= 1;
  }
}
