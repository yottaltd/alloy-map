export class AlloyMapError extends Error {
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
      return new AlloyMapError(parseInt(potentialAlloyError.errorCode.substring(1), 10), {
        httpStatusCode: potentialAlloyError.httpStatusCode,
        message: potentialAlloyError.message,
        data: potentialAlloyError.errorData,
        category: potentialAlloyError.category,
      });
    }
  }

  public readonly code: number;
  public readonly httpStatusCode?: number;
  public readonly data?: any;
  public readonly category?: number;

  constructor(
    code: number,
    options: {
      httpStatusCode?: number;
      message?: string;
      data?: any;
      category?: number;
    },
  ) {
    super(`E${code} - ${options.message}`);

    this.code = code;
    this.category = options.category;
    this.httpStatusCode = options.httpStatusCode;
  }
}
