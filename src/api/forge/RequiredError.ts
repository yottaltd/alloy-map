// tslint:disable

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
  name: string;
  constructor(public field: string, msg?: string) {
    super(msg);
    this.name = "RequiredError";
  }
}
