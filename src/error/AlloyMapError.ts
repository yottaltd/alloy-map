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
  public static parse(potentialAlloyError: any): AlloyMapError | undefined {
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
      return new AlloyMapError(
        parseInt(potentialAlloyError.errorCode.substring(1), 10),
        potentialAlloyError.message || '',
        {
          httpStatusCode: potentialAlloyError.httpStatusCode,
          data: potentialAlloyError.errorData,
          category: potentialAlloyError.category,
        },
      );
    }
  }

  /**
   * the error code
   */
  public readonly code: number;

  /**
   * the optional http status code, usually from a tile request
   */
  public readonly httpStatusCode?: number;

  /**
   * the optional error data
   */
  public readonly data?: any;

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
    code: number,
    message: string,
    options?: {
      httpStatusCode?: number;
      data?: any;
      category?: string;
    },
  ) {
    super(`E${code} - ${message}`);

    this.code = code;
    if (options) {
      this.category = options.category;
      this.httpStatusCode = options.httpStatusCode;
      this.data = options.data;
    }
  }
}
