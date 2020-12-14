import OLStyle from 'ol/style/Style';
import { AlloyStyleCacheKey } from './AlloyStyleCacheKey';

/**
 * cache implementation for alloy styles
 * @ignore
 * @internal
 */
export class AlloyStyleCache {
  /**
   * the internal cache of styles
   */
  private readonly cache = new Map<AlloyStyleCacheKey, OLStyle | OLStyle[]>();

  /**
   * internal map for caching key objects against string keys
   */
  private readonly cacheKeys = new Map<string, AlloyStyleCacheKey>();

  /**
   * gets a style from the style cache
   * @param key the cache key for the style
   */
  public get(key: string | AlloyStyleCacheKey): OLStyle | OLStyle[] | undefined {
    const cacheKey = typeof key === 'string' ? this.cacheKeys.get(key) : key;
    return cacheKey ? this.cache.get(cacheKey) : undefined;
  }

  /**
   * sets a style in the style cache
   * @param key the cache key for the style
   * @param style the style to set
   */
  public set(key: AlloyStyleCacheKey, style: OLStyle | OLStyle[]): void {
    this.cache.set(key, style);
    this.cacheKeys.set(key.key, key);
  }

  /**
   * Clears cached styles
   */
  public clear(parts?: Record<string, any>): void {
    if (parts !== undefined) {
      const keyParts = Object.keys(parts);
      const keys = Array.from(this.cacheKeys.values()).filter((cacheKey) => {
        return keyParts.every((keyPart) => parts[keyPart] === cacheKey.parts[keyPart]);
      });
      keys.forEach((key) => {
        this.cache.delete(key);
        this.cacheKeys.delete(key.key);
      });
    } else {
      this.cache.clear();
      this.cacheKeys.clear();
    }
  }
}
