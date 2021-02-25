/**
 * an alloy map error, contains detailed error information about map exceptions
 */
export class AlloyMapError extends Error {
  /**
   * attempts to parse an alloy map error either from json or another error instance
   * @param potentialAlloyError the potential alloy map error to parse
   * @ignore
   * @internal
   */
  public static parse(potentialAlloyError: Record<string, unknown>): AlloyMapError | undefined {
    if (potentialAlloyError instanceof AlloyMapError) {
      return potentialAlloyError;
    }

    // Check that the object looks like an AlloyError.
    if (
      potentialAlloyError.hasOwnProperty('category') &&
      potentialAlloyError.hasOwnProperty('errorCode') &&
      potentialAlloyError.hasOwnProperty('errorData') &&
      potentialAlloyError.hasOwnProperty('httpStatusCode') &&
      potentialAlloyError.hasOwnProperty('message')
    ) {
      let message: string;
      let errorCode: number;
      let httpStatusCode: number;
      let category: string;

      if (typeof potentialAlloyError.errorCode === 'string') {
        errorCode = parseInt(potentialAlloyError.errorCode.substring(1), 10);
      } else if (typeof potentialAlloyError.errorCode === 'number') {
        errorCode = potentialAlloyError.errorCode;
      } else {
        throw new Error('Failed to parse AlloyMapError - errorCode was of invalid type.');
      }

      if (typeof potentialAlloyError.message === 'string') {
        message = potentialAlloyError.message;
      } else {
        throw new Error('Failed to parse AlloyMapError - message was of invalid type.');
      }

      if (typeof potentialAlloyError.httpStatusCode === 'string') {
        httpStatusCode = parseInt(potentialAlloyError.httpStatusCode, 10);
      } else if (typeof potentialAlloyError.httpStatusCode === 'number') {
        httpStatusCode = potentialAlloyError.httpStatusCode;
      } else {
        throw new Error('Failed to parse AlloyMapError - httpStatusCode was of invalid type.');
      }

      if (typeof potentialAlloyError.category === 'string') {
        category = potentialAlloyError.category;
      } else {
        throw new Error('Failed to parse AlloyMapError - category was of invalid type.');
      }

      return new AlloyMapError(errorCode, message, {
        httpStatusCode,
        data: potentialAlloyError.errorData,
        category,
      });
    }
  }

  /**
   * the error code
   */
  public readonly code: string;

  /**
   * the optional http status code, usually from a tile request
   */
  public readonly httpStatusCode?: number;

  /**
   * the optional error data
   */
  public readonly data?: unknown;

  /**
   * the optional error category
   */
  public readonly category?: string;

  /**
   * creates a new instance
   * @param code the error code, must be unique
   * @param message the error message for developers
   * @param options the optional options for the error
   */
  constructor(
    code: string | number,
    message: string,
    options?: {
      httpStatusCode?: number;
      data?: unknown;
      category?: string;
    },
  ) {
    super(`E${code} - ${message}`);

    this.code = typeof code === 'number' ? 'E' + code : code;
    if (options) {
      this.category = options.category;
      this.httpStatusCode = options.httpStatusCode;
      this.data = options.data;
    }
  }
}
