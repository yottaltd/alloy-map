/**
 * utility for formatting numbers
 * @ignore
 */
export abstract class NumberFormatUtils {
  /**
   * formats a positive number into a small readable value
   * @param value the value to format
   */
  public static smallFormatNumber(value: number): string {
    if (value < 1000) {
      return value.toString();
    } else if (value < 10_000) {
      return Math.round(value / 100) / 10 + 'k';
    } else if (value < 1_000_000) {
      return Math.round(value / 1000) + 'k';
    } else if (value < 10_000_000) {
      return Math.round(value / 100000) / 10 + 'm';
    } else if (value < 100_000_000) {
      return Math.round(value / 1000000) + 'm';
    } else {
      return '100m+';
    }
  }
}
