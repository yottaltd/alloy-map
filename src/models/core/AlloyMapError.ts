export class AlloyMapError extends Error {
  public readonly errorCode: number;

  constructor(errorCode: number, message: string) {
    super(`error: ${errorCode}, message: ${message}`);
    this.errorCode = errorCode;
  }
}
