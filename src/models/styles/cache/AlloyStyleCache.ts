import OLStyle from 'ol/style/Style';

/**
 * cache implementation for alloy styles
 * @ignore
 */
export class AlloyStyleCache {
  /**
   * the internal cache of styles
   */
  private readonly cache = new Map<string, OLStyle | OLStyle[] | null>();

  /**
   * gets a style from the style cache
   * @param key the cache key for the style
   */
  public get(key: string): OLStyle | OLStyle[] | null | undefined {
    return this.cache.get(key);
  }

  /**
   * sets a style in the style cache
   * @param key the cache key for the style
   * @param style the style to set
   */
  public set(key: string, style: OLStyle | OLStyle[] | null): void {
    this.cache.set(key, style);
  }
}
