import { StringUtils } from '@/utils/StringUtils';
import { AlloyStyleCacheKey } from './AlloyStyleCacheKey';

/**
 * builder for style cache keys
 * @ignore
 * @internal
 */
export abstract class AlloyStyleCacheKeyBuilder {
  /**
   * creates a cache key from parts
   * @param parts key parts to build into a cache key
   */
  public static create(parts: Record<string, any>): AlloyStyleCacheKey {
    const key = StringUtils.cacheKeyConcat(...Object.keys(parts).map((key) => parts[key]));
    return {
      key,
      parts,
    };
  }
}
