import OLStyle from 'ol/style/Style';

/**
 * cache implementation for alloy styles
 * @ignore
 * @internal
 */
export class AlloyStyleCache {
  /**
   * the internal cache of styles
   */
  private readonly cache = new Map<string, OLStyle | OLStyle[]>();

  /**
   * gets a style from the style cache
   * @param key the cache key for the style
   */
  public get(key: string): OLStyle | OLStyle[] | undefined {
    return this.cache.get(key);
  }

  /**
   * sets a style in the style cache
   * @param key the cache key for the style
   * @param style the style to set
   */
  public set(key: string, style: OLStyle | OLStyle[]): void {
    this.cache.set(key, style);
  }

  /**
   * Clears cached styles that contain id as part of the key
   */
  public clear(id: string): void {
    Array.from(this.cache.keys())
      .filter((key) => key.includes(id))
      .forEach((key) => this.cache.delete(key));
  }
}
