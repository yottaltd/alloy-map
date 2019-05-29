/**
 * maths utilities
 * @ignore
 * @internal
 */
export abstract class MathUtils {
  /**
   * compares two numbers for equality with an allowed margin of difference
   * @param value1 the first value to compare
   * @param value2 the second value to compare
   * @param epsilon the allowed difference between the provided values to consider "equal"
   */
  public static approximateEquals(value1: number, value2: number, epsilon: number): boolean {
    return Math.abs(value1 - value2) < epsilon;
  }
}
