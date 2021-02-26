/**
 * utility for strings
 * @ignore
 * @internal
 */
export abstract class StringUtils {
  /**
   * concats keys into consistent format
   * @param args the arguments to create a cache key for
   */
  public static cacheKeyConcat(...args: unknown[]): string {
    return args.join(':');
  }
}
