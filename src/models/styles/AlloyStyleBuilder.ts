import OLStyle from 'ol/style/Style';
import { AlloyFeature } from '../features/AlloyFeature';
import { AlloyStyleCache } from './cache/AlloyStyleCache';

/**
 * base class for style builders, it implements caching in a local cache so styles can be reused.
 * please think about correct usage of cache keys for builders as this can greatly increase or
 * decrease performance.
 * @template T the feature type the style builder will build for
 * @ignore
 */
export abstract class AlloyStyleBuilder<T extends AlloyFeature> {
  /**
   * localised cache for the style builder styles
   */
  private readonly styleCache = new AlloyStyleCache();

  /**
   *
   * @param feature
   * @param resolution
   */
  public build(feature: T, resolution: number): OLStyle | OLStyle[] {
    // generate the cache key for this feature and resolution
    const key: string = this.getKey(feature, resolution);

    // attempt to get the styles from the cache
    const cachedStyle: OLStyle | OLStyle[] | null = this.styleCache.get(key);
    if (cachedStyle) {
      return cachedStyle;
    }

    // generate new styles if not in the cache
    const newStyle: OLStyle | OLStyle[] = this.createStyles(feature, resolution);

    // cache the resulting styles and return
    this.styleCache.set(key, newStyle);
    return newStyle;
  }

  /**
   * generates a consistent key for the style given feature and resolution, this should be used
   * to heavily cache styles. common properties on the feature should be used to strongly cache
   * the styles e.g. colour, resolution, icon etc.
   * @param feature the feature being styled, common properties of the key should appear in the key
   * @param resolution the resolution we're rendering styles at
   */
  protected abstract getKey(feature: T, resolution: number): string;

  /**
   * when the style builder decides to generate styles for a feature and resolution due to it
   * missing in the cache, the result of this will be cached permanently for future styles
   * @param feature the feature being styled
   * @param resolution the resolution to style at
   */
  protected abstract createStyles(feature: T, resolution: number): OLStyle | OLStyle[];
}
