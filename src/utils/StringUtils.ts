/**
 * utility for strings
 * @ignore
 */
export abstract class StringUtils {
  /**
   * concats keys into consistent format
   * @param args the arguments to create a cache key for
   */
  public static cacheKeyConcat(...args: any[]): string {
    return args.join(':');
  }
}
